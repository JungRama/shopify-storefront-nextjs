const domain = 'rahaykerj.myshopify.com'
const storefrontAccessToken = 'b55ec0a49c62d9a599b2ba7a5820fef7'

export const gql = String.raw

export const ShopifyRequest = async <T>(query: T, variables?: T) => {
	const URL = `https://${domain}/api/2023-07/graphql.json`

	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-Shopify-Storefront-Access-Token': 'b55ec0a49c62d9a599b2ba7a5820fef7',
		},
		body: JSON.stringify({
			query,
			variables,
		}),
	}

	try {
		const data = await fetch(URL, options).then((response) => {
			return response.json()
		})

		return data
	} catch (error) {
		console.log('error: ' + error)

		throw new Error('Products not fetched: ' + error)
	}
}
