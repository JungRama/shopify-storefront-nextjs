import { Product } from 'shopify-buy'

interface PropsInterface {
	productData: Product
}

export default function ProductCard(props: PropsInterface) {
	const productData = props.productData

	return (
		<div className="w-full">
			<picture>
				<img
					className="rounded-t-lg rounded-lg object-cover aspect-square"
					src={productData.featuredImage.url}
					alt={productData.featuredImage.altText}
				/>
			</picture>

			<h5 className="my-3 text-xl font-semibold tracking-tight text-gray-900">
				{productData.title}
			</h5>

			<div className="flex items-center justify-between">
				<span className="text-3xl font-bold text-gray-900">
					${productData.priceRange.minVariantPrice.amount}
				</span>
				<a
					href="#"
					className="text-white bg-slate-800 hover:bg-slate-900 focus:ring-4 focus:outline-none focus:ring-slate-400 font-medium rounded-sm text-sm px-5 py-2.5 text-center"
				>
					ADD TO CART
				</a>
			</div>
		</div>
	)
}
