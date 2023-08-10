import type { GetServerSideProps } from 'next'
import Navbar from '@/components/navbar'
import { getAllProducts } from '@/requests/products'

import { ProductInterface } from '@/types/products'
import ProductCard from '@/components/products/card'
import Image from 'next/image'
import { ArrowDownIcon } from '@heroicons/react/24/outline'
import { useEffect } from 'react'

interface PropsInterface {
	products: {
		node: ProductInterface
	}[]
}

export const getServerSideProps: GetServerSideProps<
	PropsInterface
> = async () => {
	const products = await getAllProducts()

	return {
		props: {
			products,
		},
	}
}

export default function IndexPage(props: PropsInterface) {
	useEffect(() => {}, [])

	return (
		<>
			<Navbar></Navbar>

			<div className="container mx-auto p-5">
				<div className="grid grid-cols-12 md:gap-[15px] lg:gap-[40px]">
					<div className="col-span-12 md:col-span-6 lg:col-span-6 hidden md:block">
						<Image
							src="/images/hero-1.png"
							width={1000}
							height={1000}
							alt="hero-1"
							className="w-full h-[calc(100vh-140px)] object-cover rounded-lg"
						></Image>
					</div>

					<div className="col-span-12 md:col-span-6 lg:col-span-6">
						<div className="flex flex-col justify-between h-[100%]">
							<div></div>

							<div className="grid grid-cols-12 md:gap-[15px] lg:gap-[30px]">
								<div className="col-span-12 md:col-span-8 lg:col-span-9">
									<h2 className="text-3xl md:text-5xl font-bold upper leading-tight">
										Discover the most modest jewelry collection
									</h2>
									<p className="mt-5 opacity-80 leading-relaxed">
										Each piece within the Discover Modest Jewelry Collection is
										meticulously crafted to capture the essence of grace and
										refinement.{' '}
									</p>
								</div>
							</div>

							<Image
								src="/images/hero-2.png"
								width={1000}
								height={1000}
								alt="hero-1"
								className="w-full mt-5 object-cover rounded-lg"
							></Image>
						</div>
					</div>
				</div>
			</div>

			<div className="container mx-auto p-5">
				<div className="grid grid-cols-12 md:gap-[15px] lg:gap-[40px]">
					<div className="col-span-12 md:col-span-8 lg:col-span-7">
						<h2 className="text-uppercase font-bold text-2xl md:text-5xl font-general-sans leading-snug">
							SHOP NOW AND GET <br className="hidden lg:block" /> 15% DISCOUNT
						</h2>
					</div>
					<div className="col-span-12 md:col-span-4 lg:col-span-5">
						<div className="flex h-full items-center justify-end">
							<ArrowDownIcon className="h-20"></ArrowDownIcon>
						</div>
					</div>
				</div>

				<hr className="mt-10" />
			</div>

			<div className="container mx-auto p-5">
				<div className="grid grid-cols-12 md:gap-[20px] gap-y-[20px]">
					{props.products.map((item) => {
						const productData = item.node
						return (
							<div
								key={productData.id}
								className="col-span-12 md:col-span-6 lg:col-span-3"
							>
								<ProductCard productData={productData}></ProductCard>
							</div>
						)
					})}
				</div>
			</div>
		</>
	)
}
