import {
	Button,
	Divider,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	VStack
} from "@chakra-ui/react"

import { FC } from "react"

import { RiWhatsappLine } from "react-icons/ri"

import { ListProduct } from "@/utils/Types/Product"

import { CardModalProduct } from "./CardModalProduct"
import { ButtonLeftIcon } from "@/components/Buttons/ButtonLeftIcon"
import { CardModalSeller } from "./CardModalSeller"

interface ModalViewProductInfosProps {
	isOpen: boolean
	onClose: () => void
	product: ListProduct
}

export const ModalViewProductInfos: FC<ModalViewProductInfosProps> = ({ isOpen, onClose, product }) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} size="5xl">
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{product.title}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<VStack>
						<CardModalProduct
							product={product}
						/>
						<Divider />
						<CardModalSeller
							seller={product.seller}
						/>

						<ButtonLeftIcon
							colorScheme="whatsapp"
							label="Entrar em contato"
							functionClick={() => console.log('zap')}
							icon={RiWhatsappLine}
						/>
					</VStack>
				</ModalBody>

				<ModalFooter>
					<Button onClick={onClose}>
						Fechar
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}
