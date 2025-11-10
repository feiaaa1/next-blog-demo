import Head from "next/head";
import Link from "next/link";

// 定义博客文章类型
interface Post {
	id: number;
	slug: string;
	title: string;
	excerpt: string;
	date: string;
	readTime: string;
}

// 模拟博客数据
const posts: Post[] = [
	{
		id: 1,
		slug: "first-post",
		title: "我的第一篇博客文章",
		excerpt:
			"这是我的第一篇博客文章，介绍如何使用 Next.js 构建现代化的 Web 应用。",
		date: "2024-01-15",
		readTime: "5分钟阅读",
	},
	{
		id: 2,
		slug: "react-best-practices",
		title: "React 开发最佳实践",
		excerpt: "分享一些在 React 开发中应该遵循的最佳实践和常见陷阱。",
		date: "2024-01-10",
		readTime: "8分钟阅读",
	},
	{
		id: 3,
		slug: "tailwind-css-guide",
		title: "Tailwind CSS 使用指南",
		excerpt: "详细介绍如何使用 Tailwind CSS 快速构建美观的用户界面。",
		date: "2024-01-05",
		readTime: "6分钟阅读",
	},
];

export default function Posts() {
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
												<span>{post.readTime}</span>
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
