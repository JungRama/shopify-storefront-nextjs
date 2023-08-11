import type { GetServerSideProps } from 'next'
import Navbar from '@/components/navbar'
import {
	getAllProducts,
	getProductTags,
	getProductType,
	getProductWithFilter,
} from '@/requests/products'

import { ProductInterface } from '@/types/products'
import ProductCard from '@/components/products/card'
import Image from 'next/image'
import { ArrowDownIcon } from '@heroicons/react/24/outline'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import SkeletonProduct from '@/components/products/skeleton'
import Head from 'next/head'

interface PropsInterface {
	products: {
		node: ProductInterface
	}[]
	productTags: {
		node: string
	}[]
	productTypes: {
		node: string
	}[]
}

export const getServerSideProps: GetServerSideProps<
	PropsInterface
> = async () => {
	const products = await getAllProducts()
	const productTags = await getProductTags()
	const productTypes = await getProductType()

	return {
		props: {
			products,
			productTags,
			productTypes,
		},
	}
}

export default function IndexPage(props: PropsInterface) {
	const router = useRouter()

	const [loading, setLoading] = useState<boolean>(true)

	const [productTypeSelect, setProductTypeSelect] = useState<string[]>([])
	const [productTagSelect, setProductTagSelect] = useState<string[]>([])
	const [filteredProduct, setFilteredProduct] = useState(props.products)

	const handleCheckboxChange = (
		value: string,
		state: string[],
		setState: Dispatch<SetStateAction<string[]>>,
	) => {
		if (state.includes(value)) {
			setState(state.filter((item) => item !== value))
		} else {
			setState([...state, value])
		}
	}

	useEffect(() => {
		if (router.query.tag) {
			if (Array.isArray(router.query.tag)) {
				setProductTagSelect(router.query.tag as string[])
			} else {
				setProductTagSelect([router.query.tag as string])
			}
		}

		if (router.query.type) {
			if (Array.isArray(router.query.type)) {
				setProductTypeSelect(router.query.type as string[])
			} else {
				setProductTypeSelect([router.query.type as string])
			}
		}
	}, [])

	useEffect(() => {
		setLoading(true)

		const type = productTypeSelect.map((item) => 'type=' + item)
		const typeURL = type.join('&')

		const tag = productTagSelect.map((item) => 'tag=' + item)
		const tagURL = tag.join('&')

		let urlQuery = null

		if (tagURL || typeURL) {
			urlQuery = '?' + typeURL + '&' + tagURL
		}

		if (productTypeSelect.length > 0 || productTagSelect.length > 0) {
			router.push('/product' + urlQuery)
		} else {
			router.push('/product')
		}

		const fetchProductFiltered = async () => {
			const products = await getProductWithFilter(
				productTypeSelect,
				productTagSelect,
			)
			setFilteredProduct(products)

			setLoading(false)
		}

		const fetchProductAll = async () => {
			const products = await getAllProducts()
			setFilteredProduct(products)

			setLoading(false)
		}

		if (urlQuery) {
			fetchProductFiltered()
		} else {
			fetchProductAll()
		}
	}, [productTagSelect, productTypeSelect])

	return (
		<>
			<Head>
				<title>Explore Jewelry - The Modest</title>
				<meta
					name="description"
					content="Each piece within the Discover Modest Jewelry Collection is meticulously crafted to capture the essence of grace and refinement."
				/>
			</Head>

			<Navbar></Navbar>

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
					<div className="col-span-12 md:col-span-2 lg:col-span-2">
						<div className="sticky top-10">
							<h2 className="mb-3 font-bold">Product Type</h2>

							<div className="grid grid-cols-12 md:gap-[20px] gap-y-[20px]">
								{props.productTypes.map((item) => {
									return (
										<div
											key={item.node}
											className="col-span-4 md:col-span-12 lg:col-span-12"
										>
											<div className="relative flex gap-x-3">
												<div className="flex h-6 items-center">
													<input
														id={item.node}
														name={item.node}
														value={item.node}
														checked={productTypeSelect.includes(item.node)}
														onChange={() =>
															handleCheckboxChange(
																item.node,
																productTypeSelect,
																setProductTypeSelect,
															)
														}
														type="checkbox"
														className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
													/>
												</div>
												<div className="text-sm leading-6">
													<label
														htmlFor={item.node}
														className="font-medium text-gray-900"
													>
														{item.node}
													</label>
												</div>
											</div>
										</div>
									)
								})}
							</div>

							<h2 className="mb-3 mt-6 font-bold">Tags</h2>
							<div className="grid grid-cols-12 md:gap-[20px] gap-y-[20px]">
								{props.productTags.map((item) => {
									return (
										<div
											key={item.node}
											className="col-span-4 md:col-span-12 lg:col-span-12"
										>
											<div className="relative flex gap-x-3">
												<div className="flex h-6 items-center">
													<input
														id={item.node}
														name={item.node}
														value={item.node}
														checked={productTagSelect.includes(item.node)}
														onChange={() =>
															handleCheckboxChange(
																item.node,
																productTagSelect,
																setProductTagSelect,
															)
														}
														type="checkbox"
														className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
													/>
												</div>
												<div className="text-sm leading-6">
													<label
														htmlFor={item.node}
														className="font-medium text-gray-900"
													>
														{item.node}
													</label>
												</div>
											</div>
										</div>
									)
								})}
							</div>
						</div>
					</div>

					<div className="col-span-12 md:col-span-10 lg:col-span-10">
						<div className="grid grid-cols-12 md:gap-[20px] gap-y-[20px]">
							{loading &&
								[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => {
									return (
										<div
											key={item}
											className="col-span-12 md:col-span-6 lg:col-span-3"
										>
											<SkeletonProduct></SkeletonProduct>
										</div>
									)
								})}

							{!loading &&
								filteredProduct.map((item) => {
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
				</div>
			</div>
		</>
	)
}
