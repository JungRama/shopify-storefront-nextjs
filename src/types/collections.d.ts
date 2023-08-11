export interface CollectionInterface {
	title: string
	image: {
		url: string
	}
	description: string
	products: {
		edges: Array<{
			node: {
				handle: string
				title: string
				featuredImage: {
					url: string
					altText: any
				}
			}
		}>
	}
}
