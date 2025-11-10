import { useRouter } from "next/router";
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

interface UserPageProps {
	user: User | null;
}

export async function getServerSideProps({ params }: { params: { id: string } }) {
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

	const user = users.find((u) => u.id === parseInt(params.id)) || null;

	return {
		props: {
			user,
		},
	};
}

export default function UserPage({ user }: UserPageProps) {
	const router = useRouter();

	if (!user) {
		return (
			<div className="container mx-auto px-4 py-8 text-center">
				<h1 className="text-2xl font-bold text-gray-800 mb-4">用户未找到</h1>
				<p className="text-gray-600">抱歉，您查找的用户不存在。</p>
				<div className="mt-4">
					<Link href="/users" className="btn btn-primary">
						返回用户列表
					</Link>
				</div>
			</div>
		);
	}

	return (
		<>
			<Head>
				<title>{user.name} - 用户详情</title>
				<meta name="description" content={user.bio} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>

			<div className="container mx-auto px-4 py-8 max-w-2xl">
				<div className="card p-8">
					<div className="text-center mb-8">
						<img
							src={user.avatar}
							alt={user.name}
							className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
						/>
						<h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
						<p className="text-gray-600 mb-4">{user.email}</p>
						<p className="text-gray-500 text-sm">加入时间: {user.joined}</p>
					</div>

					<div className="mb-8">
						<h2 className="text-xl font-semibold text-gray-800 mb-4">个人简介</h2>
						<p className="text-gray-600 leading-relaxed">{user.bio}</p>
					</div>

					<div className="flex justify-center">
						<Link href="/users" className="btn btn-outline">
							← 返回用户列表
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}