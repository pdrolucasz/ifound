import {
	SimpleGrid,
	VStack
} from '@chakra-ui/react'
import { GetServerSideProps, NextPage } from 'next'

import { ListProduct } from '@/utils/Types/Product'
import { CardProduct } from '@/components/Product/CardProduct'

interface HomeProps {
	selectedProduct?: string
	products: ListProduct[]
}

const Home: NextPage<HomeProps> = ({ products, selectedProduct }) => {
	return (
		<VStack w="100%" align="flex-start">
			<SimpleGrid w="100%" minChildWidth="400px" spacing="4">
				{products.map(product => (
					<CardProduct
						key={product.id}
						product={product}
						isActive={selectedProduct === product.id}
					/>
				))}
			</SimpleGrid>
		</VStack>
	)
}

export const getServerSideProps: GetServerSideProps = (async (ctx) => {
	const { q } = ctx.query
	// const res = await fetch('http://localhost:3000/api/products')
	// const { products } = await res.json()
	console.log(q)
	return {
		props: {
			selectedProduct: q ?? '',
			products: [{
				"id": "381869310076781143",
				"title": "Mousse de Morango",
				"description": "Uma sobremesa leve e deliciosa, feita com morangos frescos batidos até obter uma textura suave e cremosa. O mousse é aerado e tem um sabor irresistível de morangos maduros, complementado por uma camada de calda de morango. Uma experiência refrescante para satisfazer sua vontade de doces.",
				"price": 8.49,
				"image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				"seller": {
					"id": "383126254557069912",
					"name": "Erick Jacquin",
					"subtitle": "Empresário, Chef",
					"description": "Erick Jacquin é um chef de cozinha francês e um dos jurados do programa de culinária 'MasterChef Brasil', exibido pela Band desde 2014. Nasceu em 1964, em Dur Sur Auron, uma pequena e tradicional cidade do Departamento de Cher, no centro da França, perto do Vale do Loire.",
					"avatar": "https://distribuicao.abad.com.br/wp-content/uploads/2017/07/Pomarola.jpg",
					"phone": "5585996454838"
				}
			}]
		}
	}
})

export default Home
