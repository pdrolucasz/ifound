import { FC, ReactNode } from 'react'

import { CartProvider } from './CartContext'

interface Props {
	children: ReactNode
}

export const AppProvider: FC<Props> = ({ children }) => (
	<CartProvider>
		{children}
	</CartProvider>
)
