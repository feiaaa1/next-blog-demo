import Head from "next/head";

export default function About() {
	return (
		<>
			<Head>
				<title>关于我 - 我的博客</title>
				<meta name="description" content="关于我的个人介绍和技术背景" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>

			<div className="container mx-auto px-4 py-8">
				<div className="max-w-3xl mx-auto">
					<div className="text-center mb-12">
						<h1 className="text-3xl font-bold text-gray-900 mb-4">关于我</h1>
						<div className="w-24 h-1 bg-blue-600 mx-auto"></div>
					</div>

					<div className="card p-8">
						<div className="text-center mb-8">
							<div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
								<span className="text-4xl">👤</span>
							</div>
							<h2 className="text-2xl font-semibold text-gray-800 mb-2">
								前端开发者
							</h2>
							<p className="text-gray-600">热爱技术，专注用户体验</p>
						</div>

						<div className="space-y-6">
							<section>
								<h3 className="text-xl font-semibold text-gray-800 mb-3">
									个人简介
								</h3>
								<p className="text-gray-600 leading-relaxed">
									我是一名热爱前端开发的程序员，专注于使用现代 Web
									技术构建优秀的用户体验。 拥有丰富的 React 和 Next.js
									开发经验，热衷于学习新技术并将其应用到实际项目中。
								</p>
							</section>

							<section>
								<h3 className="text-xl font-semibold text-gray-800 mb-3">
									技术栈
								</h3>
								<div className="flex flex-wrap gap-2">
									<span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
										React
									</span>
									<span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
										Next.js
									</span>
									<span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
										TypeScript
									</span>
									<span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
										Tailwind CSS
									</span>
									<span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
										Node.js
									</span>
									<span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
										Git
									</span>
								</div>
							</section>

							<section>
								<h3 className="text-xl font-semibold text-gray-800 mb-3">
									联系方式
								</h3>
								<div className="space-y-2 text-gray-600">
									<p>📧 Email: example@example.com</p>
									<p>🔗 GitHub: github.com/yourusername</p>
									<p>💼 LinkedIn: linkedin.com/in/yourprofile</p>
								</div>
							</section>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
