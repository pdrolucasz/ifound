import {
	SimpleGrid,
	VStack
} from '@chakra-ui/react'
import { GetServerSideProps, NextPage } from 'next'

import { ListProduct } from '@/utils/Types/Product'
import { CardProduct } from '@/components/Product/CardProduct'

interface HomeProps {
	products: ListProduct[]
}

const Home: NextPage<HomeProps> = ({ products }) => {
	return (
		<VStack w="100%">
			<SimpleGrid w="100%" minChildWidth="400px" spacing="4">
				{products.map(product => (
					<CardProduct
						key={product.id}
						product={product}
					/>
				))}
			</SimpleGrid>
		</VStack>
	)
}

export const getServerSideProps: GetServerSideProps = (async (ctx) => {
	const res = await fetch('https://ifound-delta.vercel.app/api/products')
	const { products } = await res.json()
	return { props: { products } }
})

export default Home
