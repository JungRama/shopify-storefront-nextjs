export interface ProductInterface {
	id: string
	handle: string
	descriptionHtml: string
	featuredImage: featuredImage
	priceRange: priceRange
	images: {
		edges: {
			node: images
		}[]
	}
	variants: {
		edges: {
			node: variants
		}[]
	}
	title: string
}

export interface featuredImage {
	url: string
	altText: any
}

export interface priceRange {
	maxVariantPrice: {
		amount: string
	}
	minVariantPrice: {
		amount: string
	}
}

export interface images {
	url: string
	altText: any
}

export interface variants {
	id: string
	displayName: string
	availableForSale: boolean
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
