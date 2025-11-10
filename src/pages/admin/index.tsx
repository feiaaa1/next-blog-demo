import Head from "next/head";

export default function AdminDashboard() {
	return (
		<>
			<Head>
				<title>管理后台 - 我的博客</title>
				<meta name="description" content="博客管理后台" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>

			<div className="container mx-auto px-4 py-8">
				<div className="text-center mb-12">
					<h1 className="text-3xl font-bold text-gray-900 mb-4">管理后台</h1>
					<p className="text-gray-600">欢迎来到博客管理后台</p>
				</div>

				<div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
					{/* 文章管理卡片 */}
					<div className="card p-8 text-center hover:shadow-lg transition-shadow duration-200">
						<div className="text-4xl mb-4">📝</div>
						<h2 className="text-xl font-semibold text-gray-800 mb-4">文章管理</h2>
						<p className="text-gray-600 mb-6">创建、编辑和管理博客文章</p>
						<a href="/admin/posts" className="btn btn-primary inline-block">
							管理文章
						</a>
					</div>

					{/* 用户管理卡片 */}
					<div className="card p-8 text-center hover:shadow-lg transition-shadow duration-200">
						<div className="text-4xl mb-4">👥</div>
						<h2 className="text-xl font-semibold text-gray-800 mb-4">用户管理</h2>
						<p className="text-gray-600 mb-6">管理用户信息和权限</p>
						<a href="/admin/users" className="btn btn-primary inline-block">
							管理用户
						</a>
					</div>
				</div>

				<div className="mt-12 text-center">
					<div className="card p-6 max-w-2xl mx-auto">
						<h3 className="text-lg font-semibold text-gray-800 mb-4">功能说明</h3>
						<div className="text-gray-600 space-y-2 text-sm">
							<p>• 使用 getStaticProps 实现静态生成的文章列表页面</p>
							<p>• 使用 getStaticPaths 和 getStaticProps 预渲染文章详情页</p>
							<p>• 使用 getServerSideProps 实现服务器端渲染的用户页面</p>
							<p>• 通过 API Routes 实现文章和用户的增删改查功能</p>
							<p>• 管理后台提供完整的 CRUD 操作界面</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}