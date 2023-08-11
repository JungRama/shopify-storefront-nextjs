import { ShopifyRequest, gql } from '@/utils/shopify-request'

export async function getAllCollections() {
	const query = gql`
		{
			collections(first: 10) {
				edges {
					node {
						title
						image {
							url
						}
						description
						products(first: 10) {
							edges {
								node {
									handle
									title
									featuredImage {
										url
										altText
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

	const data = response.data.collections.edges
		? response.data.collections.edges
		: []

	return data
}
