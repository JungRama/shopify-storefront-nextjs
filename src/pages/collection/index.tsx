import type { GetServerSideProps } from 'next'
import Navbar from '@/components/navbar'
import { useEffect } from 'react'
import { CollectionInterface } from '@/types/collections'
import { getAllCollections } from '@/requests/collections'
import Link from 'next/link'
import Head from 'next/head'

interface PropsInterface {
	collections: {
		node: CollectionInterface
	}[]
}

export const getServerSideProps: GetServerSideProps<
	PropsInterface
> = async () => {
	const collections = await getAllCollections()

	return {
		props: {
			collections,
		},
	}
}

export default function IndexPage(props: PropsInterface) {
	useEffect(() => {}, [])

	return (
		<>
			<Head>
				<title>Our Collection - The Modest</title>
				<meta
					name="description"
					content="Each piece within the Discover Modest Jewelry Collection is meticulously crafted to capture the essence of grace and refinement."
				/>
			</Head>

			<Navbar></Navbar>

			<div className="container mx-auto p-5">
				{props.collections
					.filter((item) => item.node.title !== 'All Product')
					.map((item) => {
						const collectionData = item.node
						return (
							<div
								key={collectionData.title}
								className="items-center my-10 grid grid-cols-12 md:gap-[20px] gap-y-[20px]"
							>
								<div className="col-[1_/_span_12] md:col-[2_/_span_5] lg:col-[2_/_span_5]">
									<img
										src={collectionData.image?.url}
										alt={collectionData.title}
										className="rounded-lg"
									/>
								</div>

								<div className="col-[1_/_span_12] md:col-[7_/_span_5] lg:col-[7_/_span_5]">
									<h2 className="text-3xl">{collectionData.title}</h2>
									<p className="text-sm mt-3 opacity-60 leading-relaxed">
										{collectionData.description}
									</p>

									<div className="flex gap-2 mt-5">
										{collectionData.products.edges.map((product) => {
											const productData = product.node
											return (
												<Link
													key={productData.title}
													href={'/product/' + productData.handle}
												>
													<img
														src={productData.featuredImage.url}
														alt={productData.featuredImage.altText}
														className="w-[50px] object-cover aspect-square rounded-md"
													/>
												</Link>
											)
										})}
									</div>
								</div>
							</div>
						)
					})}
			</div>
		</>
	)
}
