import {
	Button,
	ButtonGroup,
	Card,
	CardBody,
	CardFooter,
	Divider,
	Heading,
	Image,
	Stack,
	Text,
	Tooltip,
	Box,
	IconButton
} from "@chakra-ui/react"
import { FC } from "react"

import { RiShoppingCart2Line } from "react-icons/ri"

import { useCart } from "@/contexts/CartContext"
import { ListProduct } from "@/utils/Types/Product"
import { FormatPriceCurrency } from "@/utils/Functions/FormatPrice"

interface CardProductProps {
	product: ListProduct
}

export const CardProduct: FC<CardProductProps> = ({ product }) => {
	const { addProduct } = useCart()

	return (
		<Card shadow="md" rounded="lg">
			<CardBody p="0" bg="gray.50" color="gray.900">
				<Box p="4" bg="white" roundedTop="lg">
					<Image
						src={product.image}
						alt={product.title}
						rounded="lg"
						maxH="200px"
						m="0 auto"
					/>
				</Box>

				<Stack px="4" mt='6' spacing='3'>
					<Heading size='md'>{product.title}</Heading>
					<Tooltip label={product.description} aria-label="description" hasArrow placement="auto">
						<Text noOfLines={4}>{product.description}</Text>
					</Tooltip>
					<Text color='green.600' fontSize='2xl'>
						{FormatPriceCurrency(product.price)}
					</Text>
				</Stack>
			</CardBody>
			<Divider />
			<CardFooter bg="white" color="gray.900" roundedBottom="lg">
				<ButtonGroup isAttached colorScheme="green" ml="auto">
					<IconButton
						aria-label='Add to cart'
						bg="green.700"
						_hover={{
							bg: "green.800"
						}}
						icon={<RiShoppingCart2Line />}
						onClick={() => addProduct(product)}
					/>
					<Button onClick={() => addProduct(product)}>Adicionar ao carrinho</Button>
				</ButtonGroup>
			</CardFooter>
		</Card>
	)
}
