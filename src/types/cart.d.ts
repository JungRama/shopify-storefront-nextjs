import { variants } from './products'

export interface productCart extends variants {
	productName: string
	quantity: number
}
