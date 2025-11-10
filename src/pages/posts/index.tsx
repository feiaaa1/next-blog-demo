import Head from "next/head";
import Link from "next/link";
import fs from "fs";
import path from "path";

// 定义博客文章类型
interface Post {
	id: number;
	slug: string;
	title: string;
	excerpt: string;
	date: string;
	author: string;
	tags: string[];
}

interface PostsProps {
	posts: Post[];
}

export async function getStaticProps() {
	const filePath = path.join(process.cwd(), "public", "posts.json");
	const fileContent = fs.readFileSync(filePath, "utf8");
	const posts: Post[] = JSON.parse(fileContent);

	// 按日期排序
	const sortedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return {
		props: {
			posts: sortedPosts,
		},
	};
}

export default function Posts({ posts }: PostsProps) {
	return (
		<>
			<Head>
				<title>博客文章 - 我的博客</title>
				<meta name="description" content="阅读最新的技术文章和教程" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>

			<div className="container mx-auto px-4 py-8">
				<div className="text-center mb-12">
					<h1 className="text-3xl font-bold text-gray-900 mb-4">博客文章</h1>
					<p className="text-gray-600">分享技术知识和开发经验</p>
				</div>

				<div className="max-w-4xl mx-auto">
					<div className="space-y-6">
						{posts.map((post) => (
							<article
								key={post.id}
								className="card p-6 hover:shadow-lg transition-shadow duration-200"
							>
								<Link href={`/posts/${post.slug}`} className="block">
									<div className="flex flex-col md:flex-row md:items-center md:justify-between">
										<div className="flex-1">
											<h2 className="text-xl font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
												{post.title}
											</h2>
											<p className="text-gray-600 mb-4 line-clamp-2">
												{post.excerpt}
											</p>
											<div className="flex items-center space-x-4 text-sm text-gray-500">
												<span>{post.date}</span>
												<span>•</span>
												<span>{post.author}</span>
												<span>•</span>
												<div className="flex space-x-1">
													{post.tags.map((tag) => (
														<span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
															{tag}
														</span>
													))}
												</div>
											</div>
										</div>
										<div className="mt-4 md:mt-0 md:ml-4">
											<span className="btn btn-outline text-sm">阅读更多</span>
										</div>
									</div>
								</Link>
							</article>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
