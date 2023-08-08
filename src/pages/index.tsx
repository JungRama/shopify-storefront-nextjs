import type { GetServerSideProps } from 'next'
import Navbar from '@/components/navbar'
import { getAllProducts } from '@/requests/products'

import { Product } from 'shopify-buy'
import ProductCard from '@/components/products/card'

interface PropsInterface {
	products: {
		node: Product
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
	return (
		<>
			<Navbar></Navbar>
			<div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
				<div className="grid grid-cols-12 gap-[40px]">
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
