import type { NextApiRequest, NextApiResponse } from "next";

// 内存中的用户数据存储
let users: any[] = [
  {
    id: 1,
    name: "张三",
    email: "zhangsan@example.com",
    avatar: "https://via.placeholder.com/150",
    bio: "前端开发工程师，热爱技术分享",
    joined: "2024-01-01"
  },
  {
    id: 2,
    name: "李四",
    email: "lisi@example.com",
    avatar: "https://via.placeholder.com/150",
    bio: "UI/UX设计师，专注于用户体验",
    joined: "2024-01-15"
  }
];

let nextUserId = 3;

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
    const user = users.find(u => u.id === parseInt(id as string));
    if (user) {
      res.status(200).json({ message: "获取用户成功", data: user });
    } else {
      res.status(404).json({ message: "用户未找到" });
    }
  } else {
    res.status(200).json({ message: "获取用户列表成功", data: users });
  }
}

function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, bio } = req.body;
  
  if (!name || !email) {
    res.status(400).json({ message: "姓名和邮箱是必需的" });
    return;
  }
  
  // 检查邮箱是否已存在
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    res.status(400).json({ message: "邮箱已被使用" });
    return;
  }
  
  const newUser = {
    id: nextUserId++,
    name,
    email,
    avatar: `https://via.placeholder.com/150?text=${name.charAt(0)}`,
    bio: bio || "暂无个人简介",
    joined: new Date().toISOString().split('T')[0]
  };
  
  users.push(newUser);
  res.status(201).json({ message: "创建用户成功", data: newUser });
}

function handlePut(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { name, email, bio } = req.body;
  
  if (!id) {
    res.status(400).json({ message: "用户ID是必需的" });
    return;
  }
  
  const userIndex = users.findIndex(u => u.id === parseInt(id as string));
  if (userIndex === -1) {
    res.status(404).json({ message: "用户未找到" });
    return;
  }
  
  // 检查邮箱是否被其他用户使用
  if (email) {
    const existingUser = users.find(u => u.email === email && u.id !== parseInt(id as string));
    if (existingUser) {
      res.status(400).json({ message: "邮箱已被其他用户使用" });
      return;
    }
  }
  
  const updatedUser = {
    ...users[userIndex],
    ...(name && { name }),
    ...(email && { email }),
    ...(bio && { bio }),
    avatar: email ? `https://via.placeholder.com/150?text=${name?.charAt(0) || users[userIndex].name.charAt(0)}` : undefined
  };
  
  users[userIndex] = updatedUser;
  res.status(200).json({ message: "更新用户成功", data: updatedUser });
}

function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  
  if (!id) {
    res.status(400).json({ message: "用户ID是必需的" });
    return;
  }
  
  const userIndex = users.findIndex(u => u.id === parseInt(id as string));
  if (userIndex === -1) {
    res.status(404).json({ message: "用户未找到" });
    return;
  }
  
  const deletedUser = users.splice(userIndex, 1)[0];
  res.status(200).json({ message: "删除用户成功", data: deletedUser });
}