import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Cart from '@/components/cart'
import CartState from '@/store/cart'
import { useObserver } from 'mobx-react-lite'

export default function Navbar() {
	return useObserver(() => (
		<div className="navbar">
			<header className="body-font">
				<div className="container mx-auto p-5">
					<div className="grid grid-cols-12 md:gap-[15px] lg:gap[30px]">
						<div className="col-span-12 md:col-span-4 lg:col-span-4 hidden md:block">
							<div className="flex items-center h-full">
								<Link href="/" className="mr-5 text-sm hover:text-gray-900">
									Home
								</Link>
								<Link
									href="/product"
									className="mr-5 text-sm hover:text-gray-900"
								>
									Product
								</Link>
								<Link
									href="/collection"
									className="mr-5 text-sm hover:text-gray-900"
								>
									Collection
								</Link>
							</div>
						</div>

						<div className="col-span-6 md:col-span-4 lg:col-span-4 text-left md:text-center">
							<Link href="/">
								<span className="text-3xl font-secondary font-black">
									THE MODEST
								</span>
							</Link>
						</div>
						<div className="col-span-6 md:col-span-4 lg:col-span-4">
							<div className="flex h-full items-center justify-end">
								<div
									className="flex items-center gap-1 p-2 cursor-pointer hover:bg-slate-50 rounded-sm transition-all"
									onClick={() => CartState.showCart(true)}
								>
									<ShoppingBagIcon className="h-5 w-5"></ShoppingBagIcon>
									Cart ({CartState.totalItemInCart})
								</div>
							</div>
						</div>

						<div className="col-span-12 md:col-span-4 lg:col-span-4 block md:hidden">
							<div className="flex items-center h-full mt-1">
								<Link href="/" className="mr-5 text-sm hover:text-gray-900">
									Home
								</Link>
								<Link
									href="/product"
									className="mr-5 text-sm hover:text-gray-900"
								>
									Products
								</Link>
								<Link
									href="/ collection"
									className="mr-5 text-sm hover:text-gray-900"
								>
									Collections
								</Link>
							</div>
						</div>
					</div>
				</div>
			</header>

			<Cart></Cart>
		</div>
	))
}
