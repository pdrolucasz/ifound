import {
	Box,
	Button,
	HStack,
	Icon,
	IconButton,
	Tooltip
} from '@chakra-ui/react'
import { FC } from 'react'

import { RiShoppingCartFill, RiFileList3Line } from 'react-icons/ri'

import { useCart } from '@/contexts/CartContext'

interface NotificationsNavProps {

}

export const NotificationsNav: FC<NotificationsNavProps> = () => {
	const { cart } = useCart()

	return (
		<HStack
			mx={["6", "8"]}
			pr={["6", "8"]}
			py="1"
			color="gray.300"
			borderRightWidth={1}
			borderColor="gray.700"
		>
			<Tooltip label="Carrinho" aria-label='Cart'>
				<Button
					position="relative"
					variant="ghost"
					colorScheme="orange"
					fontSize="lg"
				>
					<Icon as={RiShoppingCartFill} fontSize="20" />
					{cart.length > 0 && (
						<Box
							rounded="full"
							width="30px"
							height="15px"
							display="block"
							position="absolute"
							border="2px solid blackAlpha"
							background="red"
							color="white"
							top="-5px"
							right="-5px"
							fontSize="sm"
						>
							{cart.length > 9 ? '9+' : cart.length}
						</Box>
					)}
				</Button>
			</Tooltip>
			<Tooltip label="Pedidos" aria-label='Orders'>
				<IconButton
					variant="ghost"
					colorScheme="orange"
					aria-label="Order list"
					fontSize="lg"
					icon={<Icon as={RiFileList3Line} fontSize="20" />}
				/>
			</Tooltip>
		</HStack>
	)
}
