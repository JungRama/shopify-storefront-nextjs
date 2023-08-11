import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import CartState from '@/store/cart'
import Head from 'next/head'
import { Analytics } from '@vercel/analytics/react'

export default function App({ Component, pageProps }: AppProps) {
	useEffect(() => {
		if (localStorage.getItem('checkout_item')) {
			const parseValue = JSON.parse(
				localStorage.getItem('checkout_item') ?? '[]',
			)
			CartState.setCartItem(parseValue)
		}
	}, [])

	return (
		<>
			<Head>
				<title>The Modest - Discover Jewelry</title>
				<link rel="icon" href="/favicon.png" />
				<meta property="og:image" content="/og-image.png" />
				<meta
					name="description"
					content="Each piece within the Discover Modest Jewelry Collection is meticulously crafted to capture the essence of grace and refinement."
				/>
			</Head>

			<Component {...pageProps} />

			<Analytics />
		</>
	)
}
