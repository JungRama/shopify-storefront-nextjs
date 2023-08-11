import { useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import Navbar from '@/components/navbar'

import { getProductByHandle } from '@/requests/products'
import { GetServerSideProps } from 'next'
import { ProductInterface, variants } from '@/types/products'

import parse from 'html-react-parser'
import SwiperImageProduct from '@/components/products/swiper-image-product'
import SelectVariant from '@/components/products/select-variant'
import { addToCart } from '@/requests/checkout'
import Head from 'next/head'

interface PropsInterface {
	productDetail: ProductInterface
}

export const getServerSideProps: GetServerSideProps<PropsInterface> = async (
	context,
) => {
	let productDetail = null

	if (context.params) {
		productDetail = await getProductByHandle(context.params.slug as string)
	}

	return {
		props: {
			productDetail,
		},
	}
}

export default function Example(props: PropsInterface) {
	const productDetail = props.productDetail

	const [selectedVariant, setSelectedVariant] = useState<{
		node: variants
	} | null>(productDetail.variants.edges[0])

	return (
		<div>
			<Head>
				<title>{productDetail.title} - The Modest</title>
				<meta
					name="description"
					content="Each piece within the Discover Modest Jewelry Collection is meticulously crafted to capture the essence of grace and refinement."
				/>
			</Head>

			<Navbar></Navbar>

			<div className="container mx-auto p-5">
				<div className="lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto] lg:gap-x-8 mt-8">
					<div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
						<h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
							{productDetail.title}
						</h1>
					</div>

					<div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
						<SwiperImageProduct
							images={productDetail.images}
						></SwiperImageProduct>
					</div>

					<div className="mt-4 lg:row-span-3 lg:mt-0">
						<h2 className="sr-only">Product information</h2>
						<div>
							<h3 className="sr-only">Reviews</h3>
							<div className="flex items-center gap-1 mb-2">
								<StarIcon className="h-4 text-orange-400"></StarIcon>
								<p className="text-lg mb-0 font-bold">4.9</p>
								<p className="text-lg mb-0">(329 Reviews)</p>
							</div>
						</div>

						<div className="text-base text-description-product-html text-gray-900">
							{parse(productDetail.descriptionHtml)}
						</div>

						<form className="mt-10">
							{productDetail.variants.edges.length > 1 && (
								<SelectVariant
									options={productDetail.variants}
									onVariantSelect={setSelectedVariant}
								></SelectVariant>
							)}

							{!selectedVariant?.node.availableForSale && (
								<div
									className="px-4 py-3 mt-5 leading-normal text-orange-700 bg-orange-100 rounded-lg"
									role="alert"
								>
									<p>Sorry, not available for sale!</p>
								</div>
							)}

							<button
								onClick={() =>
									addToCart(
										productDetail.title ?? null,
										selectedVariant?.node ?? null,
										selectedVariant?.node.id ?? null,
										1,
									)
								}
								type="button"
								className="mt-5 flex w-full items-center justify-between rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white hover:bg-slate-900 focus:outline-none focus:ring-2 focus:bg-slate-900 focus:ring-offset-2"
							>
								<span>Add to Cart</span>
								<span>
									(
									{selectedVariant?.node.compareAtPrice && (
										<span className="line-through mr-1">
											{selectedVariant?.node.compareAtPrice.amount}
										</span>
									)}
									${selectedVariant?.node.price.amount})
								</span>
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
