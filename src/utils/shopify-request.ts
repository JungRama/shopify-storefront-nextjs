const domain = 'rahaykerj.myshopify.com'
const storefrontAccessToken = 'b55ec0a49c62d9a599b2ba7a5820fef7'

export const ShopifyRequest = async <T>(query: T) => {
	const URL = `https://${domain}/api/2023-10/graphql.json`

	const options = {
		endpoint: URL,
		method: 'POST',
		headers: {
			'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ query }),
	}

	try {
		const data = await fetch(URL, options).then((response) => {
			return response.json()
		})

		return data
	} catch (error) {
		throw new Error('Products not fetched: ' + error)
	}
}
