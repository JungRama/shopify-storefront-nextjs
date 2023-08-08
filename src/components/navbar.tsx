import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function Navbar() {
	return (
		<div className="navbar">
			<header className="body-font">
				<div className="container mx-auto p-5">
					<div className="grid grid-cols-12 md:gap-[15px] lg:gap[30px]">
						<div className="col-span-12 md:col-span-4 lg:col-span-4">
							<div className="flex items-center h-full">
								<Link href="/" className="mr-5 text-sm hover:text-gray-900">
									Home
								</Link>
								<Link href="/" className="mr-5 text-sm hover:text-gray-900">
									Products
								</Link>
								<Link href="/" className="mr-5 text-sm hover:text-gray-900">
									Collections
								</Link>
							</div>
						</div>
						<div className="col-span-12 md:col-span-4 lg:col-span-4 text-center">
							<Link href="/">
								<span className="text-3xl font-secondary font-black">
									Sierna
								</span>
							</Link>
						</div>
						<div className="col-span-12 md:col-span-4 lg:col-span-4">
							<div className="flex h-full items-center justify-end">
								<div className="flex gap-1 p-2 cursor-pointer hover:bg-slate-50 rounded-sm transition-all">
									<ShoppingBagIcon className="h-5 w-5"></ShoppingBagIcon>
									Cart (5)
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
		</div>
	)
}
