import Head from "next/head";
import { useState, useEffect } from "react";

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

interface AdminPostsPageProps {
	posts: Post[];
}

export default function AdminPostsPage() {
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [formData, setFormData] = useState({
		title: "",
		content: "",
		excerpt: "",
		author: "",
		tags: ""
	});
	const [editingPost, setEditingPost] = useState<Post | null>(null);

	useEffect(() => {
		fetchPosts();
	}, []);

	const fetchPosts = async () => {
		try {
			setLoading(true);
			const response = await fetch("/api/posts");
			const result = await response.json();
			
			if (response.ok) {
				setPosts(result.data);
			} else {
				setError(result.message || "获取文章列表失败");
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
			const postData = {
				...formData,
				tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
			};

			const url = editingPost ? `/api/posts?id=${editingPost.id}` : "/api/posts";
			const method = editingPost ? "PUT" : "POST";

			const response = await fetch(url, {
				method,
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(postData),
			});

			const result = await response.json();

			if (response.ok) {
				fetchPosts(); // 重新获取文章列表
				setFormData({ title: "", content: "", excerpt: "", author: "", tags: "" });
				setEditingPost(null);
				alert(editingPost ? "文章更新成功" : "文章创建成功");
			} else {
				alert(result.message || "操作失败");
			}
		} catch (err) {
			alert("网络错误，请稍后重试");
		}
	};

	const handleEdit = (post: Post) => {
		setFormData({
			title: post.title,
			content: post.content || "",
			excerpt: post.excerpt,
			author: post.author,
			tags: post.tags.join(", ")
		});
		setEditingPost(post);
	};

	const handleDelete = async (id: number) => {
		if (!confirm("确定要删除这篇文章吗？")) return;

		try {
			const response = await fetch(`/api/posts?id=${id}`, {
				method: "DELETE",
			});

			const result = await response.json();

			if (response.ok) {
				fetchPosts(); // 重新获取文章列表
				alert("文章删除成功");
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
				<title>文章管理 - 管理后台</title>
				<meta name="description" content="管理博客文章" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>

			<div className="container mx-auto px-4 py-8">
				<div className="text-center mb-12">
					<h1 className="text-3xl font-bold text-gray-900 mb-4">文章管理</h1>
					<p className="text-gray-600">在这里您可以管理所有博客文章</p>
				</div>

				<div className="grid md:grid-cols-2 gap-8">
					{/* 文章管理表单 */}
					<div className="card p-6">
						<h2 className="text-xl font-semibold text-gray-800 mb-4">
							{editingPost ? "编辑文章" : "创建新文章"}
						</h2>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									标题
								</label>
								<input
									type="text"
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									value={formData.title}
									onChange={(e) => setFormData({ ...formData, title: e.target.value })}
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									内容
								</label>
								<textarea
									required
									rows={4}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									value={formData.content}
									onChange={(e) => setFormData({ ...formData, content: e.target.value })}
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									摘要
								</label>
								<input
									type="text"
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									value={formData.excerpt}
									onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									作者
								</label>
								<input
									type="text"
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									value={formData.author}
									onChange={(e) => setFormData({ ...formData, author: e.target.value })}
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									标签 (用逗号分隔)
								</label>
								<input
									type="text"
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									value={formData.tags}
									onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
									placeholder="例如: React,JavaScript,前端"
								/>
							</div>
							<div className="flex space-x-4">
								<button
									type="submit"
									className="btn btn-primary flex-1"
								>
									{editingPost ? "更新文章" : "创建文章"}
								</button>
								{editingPost && (
									<button
										type="button"
										onClick={() => {
											setFormData({ title: "", content: "", excerpt: "", author: "", tags: "" });
											setEditingPost(null);
										}}
										className="btn btn-secondary flex-1"
									>
										取消编辑
									</button>
								)}
							</div>
						</form>
					</div>

					{/* 文章列表 */}
					<div className="card p-6">
						<h2 className="text-xl font-semibold text-gray-800 mb-4">文章列表</h2>
						{error && (
							<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
								{error}
							</div>
						)}
						<div className="space-y-4">
							{posts.map((post) => (
								<div key={post.id} className="border border-gray-200 p-4 rounded-lg">
									<div className="flex justify-between items-start mb-2">
										<h3 className="font-medium text-gray-800">{post.title}</h3>
										<div className="flex space-x-2">
											<button
												onClick={() => handleEdit(post)}
												className="text-blue-600 hover:text-blue-800 text-sm"
											>
												编辑
											</button>
											<button
												onClick={() => handleDelete(post.id)}
												className="text-red-600 hover:text-red-800 text-sm"
											>
												删除
											</button>
										</div>
									</div>
									<p className="text-gray-600 text-sm mb-2">{post.excerpt}</p>
									<div className="flex items-center space-x-4 text-xs text-gray-500">
										<span>{post.date}</span>
										<span>•</span>
										<span>{post.author}</span>
									</div>
									<div className="flex flex-wrap gap-1 mt-2">
										{post.tags.map((tag) => (
											<span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
												{tag}
											</span>
										))}
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