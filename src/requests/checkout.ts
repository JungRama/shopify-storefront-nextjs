import CartState from '@/store/cart'
import { variants } from '@/types/products'
import { ShopifyRequest, gql } from '@/utils/shopify-request'

export async function checkoutCart() {
	const items = CartState.cartItem.map((item) => {
		return {
			variantId: item.id,
			quantity: item.quantity,
		}
	})

	const query = gql`
		mutation AddToCart($lineItems: [CheckoutLineItemInput!]!) {
			checkoutCreate(input: { lineItems: $lineItems }) {
				checkout {
					id
					webUrl
				}
			}
		}
	`

	const variable: any = {
		lineItems: items,
	}

	const response = await ShopifyRequest(query, variable)

	return response.data.checkoutCreate.checkout.webUrl
}

export async function addToCart(
	productName: string,
	variantInfo: variants | null,
	id: string | null,
	quantity: number,
) {
	if (variantInfo && id) {
		if (!variantInfo.availableForSale) {
			return
		}

		if (!localStorage.getItem('checkout_item')) {
			const item = [
				{
					...variantInfo,
					productName,
					quantity: 1,
				},
			]

			localStorage.setItem('checkout_item', JSON.stringify(item))
			CartState.setCartItem(item)
		} else {
			const item = localStorage.getItem('checkout_item')

			if (item) {
				let itemParsed = JSON.parse(item)
				const findItemIndex = itemParsed.findIndex(
					(item: variants) => item.id == id,
				)

				if (findItemIndex > -1) {
					itemParsed[findItemIndex].quantity =
						itemParsed[findItemIndex].quantity + 1
				} else {
					itemParsed.push({
						...variantInfo,
						productName,
						quantity: 1,
					})
				}

				localStorage.setItem('checkout_item', JSON.stringify(itemParsed))
				CartState.setCartItem(itemParsed)
			}
		}

		CartState.showCart(true)
	} else {
		throw Error('Variant not selected')
	}
}

export async function updateQuantity(id: string, type: string) {
	if (localStorage.getItem('checkout_item')) {
		const item = localStorage.getItem('checkout_item')

		if (item) {
			let itemParsed = JSON.parse(item)
			const findItemIndex = itemParsed.findIndex(
				(item: variants) => item.id == id,
			)

			if (findItemIndex > -1) {
				if (type === 'add') {
					itemParsed[findItemIndex].quantity =
						itemParsed[findItemIndex].quantity + 1
				} else {
					if (!(itemParsed[findItemIndex].quantity <= 1)) {
						itemParsed[findItemIndex].quantity =
							itemParsed[findItemIndex].quantity - 1
					}
				}

				localStorage.setItem('checkout_item', JSON.stringify(itemParsed))
				CartState.setCartItem(itemParsed)
			}
		}
	}
}

export async function removeFromCart(id: string) {
	if (localStorage.getItem('checkout_item')) {
		const item = localStorage.getItem('checkout_item')

		if (item) {
			let itemParsed = JSON.parse(item)
			const filterItem = itemParsed.filter((item: variants) => item.id != id)
			localStorage.setItem('checkout_item', JSON.stringify(filterItem))
			CartState.setCartItem(filterItem)
		}
	}
}
