import Head from "next/head";

export default function Home() {
	return (
		<>
			<Head>
				<title>我的博客 - 首页</title>
				<meta name="description" content="欢迎来到我的个人博客" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>

			<div className="container mx-auto px-4 py-8">
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold text-gray-900 mb-4">
						欢迎来到我的博客
					</h1>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						这是一个使用 Next.js 和 Tailwind CSS 构建的现代化博客应用。
						在这里你可以分享你的想法、经验和知识。
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					<div className="card p-6">
						<h2 className="text-xl font-semibold mb-4 text-gray-800">
							📝 博客文章
						</h2>
						<p className="text-gray-600 mb-4">
							阅读最新的技术文章和教程，涵盖前端开发、React、Next.js
							等热门话题。
						</p>
						<a href="/posts" className="btn btn-primary inline-block">
							查看文章
						</a>
					</div>

					<div className="card p-6">
						<h2 className="text-xl font-semibold mb-4 text-gray-800">
							👨‍💻 关于我
						</h2>
						<p className="text-gray-600 mb-4">
							了解我的技术背景、项目经验和联系方式。
						</p>
						<a href="/about" className="btn btn-primary inline-block">
							了解更多
						</a>
					</div>

					<div className="card p-6">
						<h2 className="text-xl font-semibold mb-4 text-gray-800">
							🚀 最新技术
						</h2>
						<p className="text-gray-600 mb-4">
							探索最新的 Web 开发技术和最佳实践，提升你的开发技能。
						</p>
						<a href="/posts" className="btn btn-primary inline-block">
							开始探索
						</a>
					</div>
				</div>
			</div>
		</>
	);
}
