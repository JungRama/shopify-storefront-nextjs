import { ShopifyRequest, gql } from '@/utils/shopify-request'

export async function createCart(id: string, quantity: number) {
	const query = gql`
    mutation {
      checkoutCreate(
        input: {
          lineItems: [
            { 
              variantId: "${id}", 
              quantity: ${quantity}}
          ]
        }
      )
      {
        checkout {
          id
          webUrl
        }
      }
    }`

	const response = await ShopifyRequest(query)

	const checkout = response.data.checkoutCreate.checkout
		? response.data.checkoutCreate.checkout
		: []

	return checkout
}

export async function addNewItemToCart(id: string, quantity: number) {
	const checkoutId = localStorage.getItem('checkout_id')

	const query = gql`
    mutation {
      checkoutLineItemsAdd(
        lineItems: [
          { 
            variantId: "${id}", 
            quantity: ${quantity}
          }
        ]
        checkoutId: "${checkoutId}"
      )
      {
        checkout {
          id
          webUrl
        }
      }
    }`

	const response = await ShopifyRequest(query)

	const checkout = response.data.checkoutLineItemsAdd.checkout
		? response.data.checkoutLineItemsAdd.checkout
		: []

	return checkout
}

export async function addToCart(id: string, quantity: number) {
	console.log(localStorage.getItem('checkout_id'))

	if (!localStorage.getItem('checkout_id')) {
		console.log('sini-1')
		const cart = await createCart(id, quantity)
		localStorage.setItem('checkout_id', cart.id)
	} else {
		await addNewItemToCart(id, quantity)
	}
}
