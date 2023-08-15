import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import IndexPage, { PropsInterface } from '@/pages/index'
import { mockProducts } from '../__mocks__/mock.products'

describe('IndexPage', () => {
	it('renders without crashing', () => {
		const products: PropsInterface['products'] = []
		render(<IndexPage products={products}></IndexPage>)
	})

	it('renders product cards with correct data', () => {
		const products: PropsInterface['products'] = mockProducts
		render(<IndexPage products={products} />)
		mockProducts.forEach((product) => {
			const productCard = screen.getByText(product.node.title)
			expect(productCard).toBeInTheDocument()
		})
	})
})
