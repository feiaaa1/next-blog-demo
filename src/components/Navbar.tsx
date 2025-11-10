import Link from "next/link";

export default function Navbar() {
	return (
		<nav className="bg-blue-600 text-white p-4">
			<div className="container mx-auto">
				<div className="flex justify-between items-center">
					<Link href="/" className="text-xl font-bold">
						我的博客
					</Link>
					<div className="space-x-4">
						<Link href="/" className="hover:text-blue-200">
							首页
						</Link>
						<Link href="/about" className="hover:text-blue-200">
							关于
						</Link>
						<Link href="/posts" className="hover:text-blue-200">
							博客
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
}
