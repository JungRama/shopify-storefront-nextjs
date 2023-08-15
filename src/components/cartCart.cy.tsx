import React from 'react'
import Cart from './cart'

describe('<Cart />', () => {
	it('renders', () => {
		// see: https://on.cypress.io/mounting-react
		cy.mount(<Cart />)
	})
})
