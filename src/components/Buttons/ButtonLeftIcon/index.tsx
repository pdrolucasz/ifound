import {
	Button,
	ButtonGroup,
	IconButton,
	ButtonGroupProps,
	Icon,
} from "@chakra-ui/react"
import { FC } from "react"

import { IconType } from 'react-icons'

interface ButtonLeftIconProps extends ButtonGroupProps {
	label: string
	icon: IconType
	functionClick?: () => void
}

export const ButtonLeftIcon: FC<ButtonLeftIconProps> = ({ functionClick, icon, label, ...rest }) => {

	return (
		<ButtonGroup isAttached colorScheme="whatsapp" ml="auto" {...rest}>
			<IconButton
				aria-label='Add to cart'
				bg="green.500"
				_hover={{
					bg: "green.600"
				}}
				icon={<Icon as={icon} fontSize="lg" />}
				onClick={functionClick}
			/>
			<Button onClick={functionClick}>{label}</Button>
		</ButtonGroup>
	)
}
