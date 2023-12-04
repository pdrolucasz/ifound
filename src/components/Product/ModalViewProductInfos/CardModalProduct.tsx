
import {
	Card,
	CardBody,
	Heading,
	Image,
	Stack,
	Text,
	Box
} from "@chakra-ui/react"

import { FC } from "react"

import { ListProduct } from "@/utils/Types/Product"
import { FormatPriceCurrency } from "@/utils/Functions/FormatPrice"

interface CardModalProductProps {
	product: ListProduct
}

export const CardModalProduct: FC<CardModalProductProps> = ({ product }) => {
	return (
		<Card
			direction={{ base: 'column', sm: 'row' }}
			overflow='hidden'
			variant='elevated'
		>
			<Box p="4">
				<Image
					rounded="md"
					objectFit='cover'
					maxW={{ base: '100%', sm: '200px' }}
					src={product.image}
					alt={product.title}
				/>
			</Box>

			<Stack>
				<CardBody>
					<Heading size='md'>{product.title}</Heading>

					<Text py='2'>{product.description}</Text>

					<Text color='green.600' fontSize='2xl'>
						{FormatPriceCurrency(product.price)}
					</Text>
				</CardBody>
			</Stack>
		</Card>
	)
}
