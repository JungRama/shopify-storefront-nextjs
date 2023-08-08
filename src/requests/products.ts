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

	const slugs = response.data.products.edges ? response.data.products.edges : []

	return slugs
}
