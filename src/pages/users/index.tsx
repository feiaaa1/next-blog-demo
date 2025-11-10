import Head from "next/head";
import Link from "next/link";

// 定义用户类型
interface User {
	id: number;
	name: string;
	email: string;
	avatar: string;
	bio: string;
	joined: string;
}

interface UsersPageProps {
	users: User[];
}

export async function getServerSideProps() {
	// 模拟从数据库或API获取用户数据
	const users: User[] = [
		{
			id: 1,
			name: "张三",
			email: "zhangsan@example.com",
			avatar: "https://via.placeholder.com/150",
			bio: "前端开发工程师，热爱技术分享",
			joined: "2024-01-01",
		},
		{
			id: 2,
			name: "李四",
			email: "lisi@example.com",
			avatar: "https://via.placeholder.com/150",
			bio: "UI/UX设计师，专注于用户体验",
			joined: "2024-01-15",
		},
		{
			id: 3,
			name: "王五",
			email: "wangwu@example.com",
			avatar: "https://via.placeholder.com/150",
			bio: "后端开发工程师，Node.js专家",
			joined: "2024-02-01",
		},
	];

	return {
		props: {
			users,
		},
	};
}

export default function UsersPage({ users }: UsersPageProps) {
	return (
		<>
			<Head>
				<title>用户列表 - 我的博客</title>
				<meta name="description" content="查看所有用户信息" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>

			<div className="container mx-auto px-4 py-8">
				<div className="text-center mb-12">
					<h1 className="text-3xl font-bold text-gray-900 mb-4">用户列表</h1>
					<p className="text-gray-600">查看所有注册用户的信息</p>
				</div>

				<div className="max-w-4xl mx-auto">
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{users.map((user) => (
							<div key={user.id} className="card p-6 text-center">
								<img
									src={user.avatar}
									alt={user.name}
									className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
								/>
								<h2 className="text-xl font-semibold text-gray-800 mb-2">{user.name}</h2>
								<p className="text-gray-600 mb-2">{user.email}</p>
								<p className="text-gray-500 text-sm mb-4">加入时间: {user.joined}</p>
								<p className="text-gray-600 mb-4 line-clamp-2">{user.bio}</p>
								<Link href={`/users/${user.id}`} className="btn btn-primary">
									查看详情
								</Link>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}