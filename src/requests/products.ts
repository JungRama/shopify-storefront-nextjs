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
