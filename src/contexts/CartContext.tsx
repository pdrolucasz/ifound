import {
	useToast
} from '@chakra-ui/react'

import { createContext, ReactNode, useContext, useState, useEffect } from 'react'
import { ListProductCart, ListProduct } from '@/utils/Types/Product'

interface CartProviderProps {
	children: ReactNode
}

interface UpdateProductAmount {
	product: ListProduct
	amount: number
}

interface CartContextData {
	cart: ListProductCart[]
	addProduct: (product: ListProduct) => Promise<void>
	removeProduct: (product: ListProductCart) => void
	updateProductAmount: ({ product, amount }: UpdateProductAmount) => void
}

const CartContext = createContext<CartContextData>({} as CartContextData)

export function CartProvider({ children }: CartProviderProps): JSX.Element {
	const [cart, setCart] = useState<ListProductCart[]>(() => {
		// const storagedCart = localStorage.getItem('@IFound:cart')

		// if (storagedCart) {
		// 	return JSON.parse(storagedCart)
		// }

		return []
	})
	const toast = useToast()

	useEffect(() => {
		if (typeof window !== 'undefined' && window.localStorage) {
			const storagedCart = localStorage.getItem('@IFound:cart')

			if (storagedCart) {
				setCart(JSON.parse(storagedCart))
			}
		}
	}, [])

	const addProduct = async (product: ListProduct) => {
		const productInCart = cart.find(prod => prod.id === product.id)

		if (productInCart) {
			updateProductAmount({
				product: productInCart,
				amount: productInCart.amount + 1
			})
		} else {
			setCart([...cart, { ...product, amount: 1 }])
			localStorage.setItem('@IFound:cart', JSON.stringify([
				...cart,
				{ ...product, amount: 1 }
			]))
		}
	}

	const removeProduct = (product: ListProductCart) => {
		const productInCart = cart.find(prod => prod.id === product.id)

		if (productInCart) {
			const filteredCart = cart.filter(prod => prod.id !== product.id)

			setCart(filteredCart)
			localStorage.setItem('@IFound:cart', JSON.stringify(filteredCart))
		} else {
			toast({
				title: 'Erro na remoção do produto',
				status: "error",
				isClosable: true,
				position: "top-right"
			})
		}
	}

	const updateProductAmount = async ({
		product,
		amount,
	}: UpdateProductAmount) => {
		if (amount <= 0) {
			return
		}

		const productInCart = cart.find(prod => prod.id === product.id)

		if (productInCart) {
			const filteredCart = cart.map(product => {
				return product.id === productInCart.id
					? { ...product, amount }
					:
					product
			})

			setCart(filteredCart)
			localStorage.setItem('@IFound:cart', JSON.stringify(filteredCart))
		} else {
			toast({
				title: 'Erro na alteração de quantidade do produto',
				status: "error",
				isClosable: true,
				position: "top-right"
			})
		}
	}

	return (
		<CartContext.Provider
			value={{ cart, addProduct, removeProduct, updateProductAmount }}
		>
			{children}
		</CartContext.Provider>
	)
}

export const useCart = () => useContext(CartContext)
