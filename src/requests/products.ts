import { ShopifyRequest, gql } from '@/utils/shopify-request'

export async function getAllProducts() {
	const query = gql`
		{
			products(first: 20) {
				edges {
					node {
						title
						id
						handle
						featuredImage {
							url
							altText
						}
						priceRange {
							minVariantPrice {
								amount
							}
						}
						variants(first: 15) {
							edges {
								node {
									id
									title
									price {
										amount
									}
									compareAtPrice {
										amount
									}
								}
							}
						}
					}
				}
			}
		}
	`

	const response = await ShopifyRequest(query)

	const data = response.data.products.edges ? response.data.products.edges : []

	return data
}

export async function getProductWithFilter(
	productType: string[],
	productTag: string[],
) {
	const query = gql`
		query VariantOptions($filters: [ProductFilter!]) {
			collection(handle: "all-product") {
				products(first: 10, filters: $filters) {
					edges {
						node {
							title
							id
							handle
							featuredImage {
								url
								altText
							}
							priceRange {
								minVariantPrice {
									amount
								}
							}
							variants(first: 15) {
								edges {
									node {
										id
										title
										price {
											amount
										}
										compareAtPrice {
											amount
										}
									}
								}
							}
						}
					}
				}
			}
		}
	`

	const filters = [
		...productType.map((item) => {
			return { productType: item }
		}),
		...productTag.map((item) => {
			return { tag: item }
		}),
	]

	const variables: any = {
		filters,
	}

	const response = await ShopifyRequest(query, variables)

	const data = response.data.collection.products.edges
		? response.data.collection.products.edges
		: []

	return data
}

export async function getProductType() {
	const query = gql`
		{
			productTypes(first: 50) {
				edges {
					node
				}
			}
		}
	`

	const response = await ShopifyRequest(query)

	const data = response.data.productTypes.edges
		? response.data.productTypes.edges
		: []

	return data
}

export async function getProductTags() {
	const query = gql`
		{
			productTags(first: 50) {
				edges {
					node
				}
			}
		}
	`

	const response = await ShopifyRequest(query)

	const data = response.data.productTags.edges
		? response.data.productTags.edges
		: []

	return data
}

export async function getProductByHandle(handle: string) {
	const query = gql`
		{
			productByHandle(handle: "${handle}") {
				title
				id
				descriptionHtml
				handle
				featuredImage {
					url
					altText
				}
				images(first: 5){
					edges {
						node {
							url
						}
					}
				}
				priceRange {
					maxVariantPrice {
						amount
					}
					minVariantPrice {
						amount
					}
				}
				variants(first: 15) {
					edges {
						node {
							id
							title
							availableForSale
							image {
								url
							}
							price {
								amount
							}
							compareAtPrice {
								amount
							}
						}
					}
				}
			}
		}
	`

	const response = await ShopifyRequest(query)

	const data = response.data.productByHandle
		? response.data.productByHandle
		: []

	return data
}
