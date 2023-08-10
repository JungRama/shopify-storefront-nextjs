import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import CartState from '@/store/cart'

export default function App({ Component, pageProps }: AppProps) {
	useEffect(() => {
		if (localStorage.getItem('checkout_item')) {
			const parseValue = JSON.parse(
				localStorage.getItem('checkout_item') ?? '[]',
			)
			CartState.setCartItem(parseValue)
		}
	}, [])

	return <Component {...pageProps} />
}
