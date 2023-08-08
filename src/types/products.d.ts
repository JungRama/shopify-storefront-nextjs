export interface ProductInterface {
	id: string
	handle: string
	featuredImage: {
		url: string
		altText: any
	}
	priceRange: {
		minVariantPrice: {
			amount: string
		}
	}
	variants: {
		edges: {
			node: {
				id: string
				displayName: string
				image: {
					url: string
				}
				title: string
				price: {
					amount: string
				}
				compareAtPrice: {
					amount: string
				}
			}
		}[]
	}
	title: string
}
