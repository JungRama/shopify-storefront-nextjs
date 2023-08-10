import { makeAutoObservable } from 'mobx'
import { productCart } from '@/types/cart'

class CartState {
	isCartOpen = false
	cartItem: productCart[] = []

	constructor() {
		makeAutoObservable(this)
	}

	showCart(value: boolean) {
		this.isCartOpen = value
	}

	setCartItem(value: productCart[]) {
		this.cartItem = value
	}

	get totalItemInCart() {
		return this.cartItem.reduce((sum, item) => sum + item.quantity, 0)
	}

	get totalAmountInCart() {
		const sumAmount = this.cartItem.reduce(
			(sum, item) => sum + parseFloat(item.price.amount) * item.quantity,
			0,
		)
		return sumAmount.toFixed(2)
	}
}

const state = new CartState()

export default state
