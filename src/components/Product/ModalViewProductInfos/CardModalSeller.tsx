
import {
	Card,
	CardBody,
	Heading,
	Stack,
	Text,
	Avatar,
} from "@chakra-ui/react"

import { FC } from "react"

import { ListSeller } from "@/utils/Types/Product"

interface CardModalSellerProps {
	seller: ListSeller
}

export const CardModalSeller: FC<CardModalSellerProps> = ({ seller }) => {
	return (
		<Card
			direction={{ base: 'column', sm: 'row' }}
			overflow='hidden'
			variant='elevated'
			align="center"
			px="4"
		>
			<Avatar
				size="2xl"
				name={seller.name}
				src={seller.avatar}
			/>

			<Stack>
				<CardBody>
					<Heading size='lg'>{seller.name}</Heading>
					<Heading size='xs'>{seller.subtitle}</Heading>

					<Text py='2'>{seller.description}</Text>
				</CardBody>
			</Stack>
		</Card>
	)
}
