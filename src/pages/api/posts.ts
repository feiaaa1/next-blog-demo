import type { NextApiRequest, NextApiResponse } from "next";

// 内存中的文章数据存储
let posts: any[] = [
  {
    id: 1,
    slug: "hello-world",
    title: "欢迎来到我的博客",
    content: "这是我的第一篇博客文章。在这里我将分享我的技术学习心得和生活感悟。",
    excerpt: "这是我的第一篇博客文章...",
    date: "2024-01-15",
    author: "chenweixi",
    tags: ["博客", "开始"]
  },
  {
    id: 2,
    slug: "react-hooks-guide",
    title: "React Hooks 完全指南",
    content: "React Hooks 是 React 16.8 引入的新特性，它让我们可以在函数组件中使用状态和其他 React 特性。本文将详细介绍各种 Hooks 的使用方法。",
    excerpt: "React Hooks 是 React 16.8 引入的新特性...",
    date: "2024-01-20",
    author: "chenweixi",
    tags: ["React", "JavaScript", "前端"]
  }
];

let nextId = 3;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return handleGet(req, res);
    case "POST":
      return handlePost(req, res);
    case "PUT":
      return handlePut(req, res);
    case "DELETE":
      return handleDelete(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).json({ message: `方法 ${req.method} 不被允许` });
  }
}

function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  
  if (id) {
    const post = posts.find(p => p.id === parseInt(id as string));
    if (post) {
      res.status(200).json({ message: "获取文章成功", data: post });
    } else {
      res.status(404).json({ message: "文章未找到" });
    }
  } else {
    res.status(200).json({ message: "获取文章列表成功", data: posts });
  }
}

function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const { title, content, excerpt, author, tags } = req.body;
  
  if (!title || !content) {
    res.status(400).json({ message: "标题和内容是必需的" });
    return;
  }
  
  const newPost = {
    id: nextId++,
    slug: title.toLowerCase().replace(/\s+/g, '-'),
    title,
    content,
    excerpt: excerpt || content.substring(0, 100) + "...",
    date: new Date().toISOString().split('T')[0],
    author: author || "匿名",
    tags: tags || []
  };
  
  posts.push(newPost);
  res.status(201).json({ message: "创建文章成功", data: newPost });
}

function handlePut(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { title, content, excerpt, author, tags } = req.body;
  
  if (!id) {
    res.status(400).json({ message: "文章ID是必需的" });
    return;
  }
  
  const postIndex = posts.findIndex(p => p.id === parseInt(id as string));
  if (postIndex === -1) {
    res.status(404).json({ message: "文章未找到" });
    return;
  }
  
  const updatedPost = {
    ...posts[postIndex],
    ...(title && { title, slug: title.toLowerCase().replace(/\s+/g, '-') }),
    ...(content && { content }),
    ...(excerpt && { excerpt }),
    ...(author && { author }),
    ...(tags && { tags }),
    date: new Date().toISOString().split('T')[0]
  };
  
  posts[postIndex] = updatedPost;
  res.status(200).json({ message: "更新文章成功", data: updatedPost });
}

function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  
  if (!id) {
    res.status(400).json({ message: "文章ID是必需的" });
    return;
  }
  
  const postIndex = posts.findIndex(p => p.id === parseInt(id as string));
  if (postIndex === -1) {
    res.status(404).json({ message: "文章未找到" });
    return;
  }
  
  const deletedPost = posts.splice(postIndex, 1)[0];
  res.status(200).json({ message: "删除文章成功", data: deletedPost });
}