import Head from "next/head";
import Link from "next/link";
import fs from "fs";
import path from "path";

// 定义博客文章类型
interface Post {
	id: number;
	slug: string;
	title: string;
	content: string;
	excerpt: string;
	date: string;
	author: string;
	tags: string[];
}

interface PostPageProps {
	post: Post | null;
}

export async function getStaticPaths() {
	const filePath = path.join(process.cwd(), "public", "posts.json");
	const fileContent = fs.readFileSync(filePath, "utf8");
	const posts: Post[] = JSON.parse(fileContent);

	const paths = posts.map((post) => ({
		params: { slug: post.slug },
	}));

	return {
		paths,
		fallback: false, // 如果请求的路径不存在，返回404页面
	};
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
	const filePath = path.join(process.cwd(), "public", "posts.json");
	const fileContent = fs.readFileSync(filePath, "utf8");
	const posts: Post[] = JSON.parse(fileContent);

	const post = posts.find((p) => p.slug === params.slug) || null;

	return {
		props: {
			post,
		},
	};
}

export default function PostPage({ post }: PostPageProps) {
	if (!post) {
		return (
			<div className="container mx-auto px-4 py-8 text-center">
				<h1 className="text-2xl font-bold text-gray-800 mb-4">文章未找到</h1>
				<p className="text-gray-600">抱歉，您查找的文章不存在。</p>
				<div className="mt-4">
					<Link href="/posts" className="btn btn-primary">
						返回博客列表
					</Link>
				</div>
			</div>
		);
	}

	return (
		<>
			<Head>
				<title>{post.title} - 我的博客</title>
				<meta name="description" content={post.excerpt} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>

			<div className="container mx-auto px-4 py-8 max-w-3xl">
				<article className="card p-8">
					<header className="mb-8">
						<h1 className="text-3xl font-bold text-gray-900 mb-4">
							{post.title}
						</h1>
						<div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
							<span>{post.date}</span>
							<span>•</span>
							<span>{post.author}</span>
						</div>
						<div className="flex space-x-2">
							{post.tags.map((tag) => (
								<span
									key={tag}
									className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
								>
									{tag}
								</span>
							))}
						</div>
					</header>

					<div className="article">
						<div className="text-gray-600 leading-relaxed whitespace-pre-wrap">
							{post.content}
						</div>
					</div>

					<footer className="mt-8 pt-6 border-t border-gray-200">
						<div className="flex justify-between items-center">
							<Link href="/posts" className="btn btn-outline">
								← 返回博客列表
							</Link>
							<div className="text-sm text-gray-500">感谢阅读！</div>
						</div>
					</footer>
				</article>
			</div>
		</>
	);
}
