import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

// 模拟博客数据
const posts = {
	"first-post": {
		title: "我的第一篇博客文章",
		content:
			"这是我的第一篇博客文章的详细内容。在这里我将介绍如何使用 Next.js 构建现代化的 Web 应用。Next.js 是一个基于 React 的框架，提供了服务器端渲染、静态站点生成等强大的功能。",
		date: "2024-01-15",
		readTime: "5分钟阅读",
	},
	"react-best-practices": {
		title: "React 开发最佳实践",
		content:
			"React 是一个非常流行的前端框架。在这篇文章中，我将分享一些在 React 开发中应该遵循的最佳实践。包括组件设计、状态管理、性能优化等方面的内容。",
		date: "2024-01-10",
		readTime: "8分钟阅读",
	},
	"tailwind-css-guide": {
		title: "Tailwind CSS 使用指南",
		content:
			"Tailwind CSS 是一个功能强大的 CSS 框架，它提供了大量的实用类来快速构建用户界面。在这篇文章中，我将详细介绍如何使用 Tailwind CSS 来创建美观且响应式的网页设计。",
		date: "2024-01-05",
		readTime: "6分钟阅读",
	},
};

export default function PostPage() {
	const router = useRouter();
	const { slug } = router.query;
	const post = posts[slug as keyof typeof posts];

	if (!post) {
		return (
			<div className="container mx-auto px-4 py-8 text-center">
				<h1 className="text-2xl font-bold text-gray-800 mb-4">文章未找到</h1>
				<p className="text-gray-600">抱歉，您查找的文章不存在。</p>
			</div>
		);
	}

	return (
		<>
			<Head>
				<title>{post.title} - 我的博客</title>
				<meta name="description" content={post.content.substring(0, 160)} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>

			<div className="container mx-auto px-4 py-8 max-w-3xl">
				<article className="card p-8">
					<header className="mb-8">
						<h1 className="text-3xl font-bold text-gray-900 mb-4">
							{post.title}
						</h1>
						<div className="flex items-center space-x-4 text-sm text-gray-500">
							<span>{post.date}</span>
							<span>•</span>
							<span>{post.readTime}</span>
						</div>
					</header>

					<div className="article">
						<p className="text-gray-600 leading-relaxed">{post.content}</p>
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
