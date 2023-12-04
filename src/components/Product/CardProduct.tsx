import {
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
	useDisclosure
} from "@chakra-ui/react"
import { FC, useEffect } from "react"

import { RiNewspaperLine } from "react-icons/ri"

import { ListProduct } from "@/utils/Types/Product"
import { FormatPriceCurrency } from "@/utils/Functions/FormatPrice"

import { ButtonLeftIcon } from "../Buttons/ButtonLeftIcon"
import { ModalViewProductInfos } from "./ModalViewProductInfos"

interface CardProductProps {
	isActive?: boolean
	product: ListProduct
}

export const CardProduct: FC<CardProductProps> = ({ product, isActive = false }) => {
	const { isOpen, onToggle } = useDisclosure()

	useEffect(() => {
		if (isActive) {
			onToggle()
		}
	}, [])

	return (
		<>
			<Card shadow="md" rounded="lg" maxW="500px" >
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
					<ButtonLeftIcon
						functionClick={onToggle}
						icon={RiNewspaperLine}
						label="Ver informações"
					/>
				</CardFooter>
			</Card>
			{isOpen && (
				<ModalViewProductInfos
					isOpen={isOpen}
					onClose={onToggle}
					product={product}
				/>
			)}

		</>
	)
}
