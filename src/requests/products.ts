import { ShopifyRequest } from '@/utils/shopify-request'

export async function getAllProducts() {
	const query = `{
    products(first: 250) {
      edges {
        node {
          handle,
          featuredImage {
            url,
            altText
          },
          priceRange {
            minVariantPrice {
              amount
            }
          },
          title,
          title,
          id
        }
      }
    }
  }`

	const response = await ShopifyRequest(query)

	const slugs = response.data.products.edges ? response.data.products.edges : []

	return slugs
}
