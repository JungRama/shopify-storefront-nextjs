import { addToCart } from '@/requests/checkout'
import { ProductInterface } from '@/types/products'
import { StarIcon } from '@heroicons/react/24/solid'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

interface PropsInterface {
	productData: ProductInterface
}

export default function ProductCard(props: PropsInterface) {
	const productData = props.productData

	const addItemToCart = () => {
		addToCart(productData.variants.edges[0].node.id, 1)
	}

	const showMinPrice = productData.variants.edges.reduce(
		(minVariant, currentVariant) => {
			const currentPrice = parseFloat(currentVariant.node.price.amount)
			const minPrice = parseFloat(minVariant.node.price.amount)

			return currentPrice < minPrice ? currentVariant : minVariant
		},
	)

	return (
		<Link href={`/product/${productData.handle}`}>
			<div className="w-full border rounded-md">
				<picture>
					<img
						className="object-cover aspect-square"
						src={productData.featuredImage.url}
						alt={productData.featuredImage.altText}
					/>
				</picture>

				<div className="mx-4 my-4">
					<h3 className="mt-4 mb-2 text-lg font-bold">{productData.title}</h3>

					<div className="flex justify-between">
						<div>
							<div className="flex items-center gap-1 mb-2">
								<StarIcon className="h-4 text-orange-400"></StarIcon>
								<p className="text-xs mb-0 font-bold">4.9</p>
								<p className="text-xs mb-0">(329 Reviews)</p>
							</div>

							<div className="flex gap-2">
								{showMinPrice.node.compareAtPrice?.amount && (
									<p className="mb-1 opacity-50 text-line line-through">
										${showMinPrice.node.compareAtPrice?.amount}
									</p>
								)}
								<p className="mb-1">${showMinPrice.node.price.amount}</p>
							</div>
						</div>

						<div>
							<div className="border p-2 rounded-full -rotate-45">
								<ArrowRightIcon className="text-black h-6 w-6"></ArrowRightIcon>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Link>
	)
}
