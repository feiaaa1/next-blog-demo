import Head from "next/head";
import { useState, useEffect } from "react";

// 定义用户类型
interface User {
	id: number;
	name: string;
	email: string;
	avatar: string;
	bio: string;
	joined: string;
}

interface AdminUsersPageProps {
	users: User[];
}

export default function AdminUsersPage() {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		bio: ""
	});
	const [editingUser, setEditingUser] = useState<User | null>(null);

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		try {
			setLoading(true);
			const response = await fetch("/api/users");
			const result = await response.json();
			
			if (response.ok) {
				setUsers(result.data);
			} else {
				setError(result.message || "获取用户列表失败");
			}
		} catch (err) {
			setError("网络错误，请稍后重试");
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const url = editingUser ? `/api/users?id=${editingUser.id}` : "/api/users";
			const method = editingUser ? "PUT" : "POST";

			const response = await fetch(url, {
				method,
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const result = await response.json();

			if (response.ok) {
				fetchUsers(); // 重新获取用户列表
				setFormData({ name: "", email: "", bio: "" });
				setEditingUser(null);
				alert(editingUser ? "用户信息更新成功" : "用户创建成功");
			} else {
				alert(result.message || "操作失败");
			}
		} catch (err) {
			alert("网络错误，请稍后重试");
		}
	};

	const handleEdit = (user: User) => {
		setFormData({
			name: user.name,
			email: user.email,
			bio: user.bio
		});
		setEditingUser(user);
	};

	const handleDelete = async (id: number) => {
		if (!confirm("确定要删除这个用户吗？")) return;

		try {
			const response = await fetch(`/api/users?id=${id}`, {
				method: "DELETE",
			});

			const result = await response.json();

			if (response.ok) {
				fetchUsers(); // 重新获取用户列表
				alert("用户删除成功");
			} else {
				alert(result.message || "删除失败");
			}
		} catch (err) {
			alert("网络错误，请稍后重试");
		}
	};

	if (loading) {
		return (
			<div className="container mx-auto px-4 py-8 text-center">
				<p className="text-gray-600">加载中...</p>
			</div>
		);
	}

	return (
		<>
			<Head>
				<title>用户管理 - 管理后台</title>
				<meta name="description" content="管理用户信息" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>

			<div className="container mx-auto px-4 py-8">
				<div className="text-center mb-12">
					<h1 className="text-3xl font-bold text-gray-900 mb-4">用户管理</h1>
					<p className="text-gray-600">在这里您可以管理所有用户信息</p>
				</div>

				<div className="grid md:grid-cols-2 gap-8">
					{/* 用户管理表单 */}
					<div className="card p-6">
						<h2 className="text-xl font-semibold text-gray-800 mb-4">
							{editingUser ? "编辑用户" : "创建新用户"}
						</h2>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									姓名
								</label>
								<input
									type="text"
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									value={formData.name}
									onChange={(e) => setFormData({ ...formData, name: e.target.value })}
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									邮箱
								</label>
								<input
									type="email"
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									value={formData.email}
									onChange={(e) => setFormData({ ...formData, email: e.target.value })}
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									个人简介
								</label>
								<textarea
									rows={3}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									value={formData.bio}
									onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
								/>
							</div>
							<button
								type="submit"
								className="btn btn-primary w-full"
							>
								{editingUser ? "更新用户" : "创建用户"}
							</button>
						</form>
					</div>

					{/* 用户列表 */}
					<div className="card p-6">
						<h2 className="text-xl font-semibold text-gray-800 mb-4">用户列表</h2>
						{error && (
							<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
								{error}
							</div>
						)}
						<div className="space-y-4">
							{users.map((user) => (
								<div key={user.id} className="flex items-center justify-between border border-gray-200 p-4 rounded-lg">
									<div className="flex items-center space-x-4">
										<img
											src={user.avatar}
											alt={user.name}
											className="w-12 h-12 rounded-full"
										/>
										<div>
											<h3 className="font-medium text-gray-800">{user.name}</h3>
											<p className="text-gray-600 text-sm">{user.email}</p>
											<p className="text-gray-500 text-xs">加入时间: {user.joined}</p>
										</div>
									</div>
									<div className="flex space-x-2">
										<button
											onClick={() => handleEdit(user)}
											className="text-blue-600 hover:text-blue-800 text-sm"
										>
											编辑
										</button>
										<button
											onClick={() => handleDelete(user.id)}
											className="text-red-600 hover:text-red-800 text-sm"
										>
											删除
										</button>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}