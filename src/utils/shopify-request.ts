const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const storefrontAccessToken =
	process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESSTOKEN

export const gql = String.raw

export const ShopifyRequest = async <T>(query: T, variables?: T) => {
	const URL = `https://${domain}/api/2023-07/graphql.json`

	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-Shopify-Storefront-Access-Token':
				(storefrontAccessToken as string) ?? '',
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
		throw new Error('Error: ' + error)
	}
}
