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

import Link from "next/link"
import { FC, useMemo } from "react"

import { useSession } from 'next-auth/react'

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
	const { data } = useSession()

	const message = useMemo(() => {
		if (data && data.user) {
			return `Oi ${product.seller.name},\n\nMeu nome é ${data.user.name}. Vi o ${product.title} no Ifound e gostaria de saber mais.\n\nLink do produto: ${process.env.NEXT_PUBLIC_URL_SITE!}?q=${product.id}`
		}

		return `Oi ${product.seller.name},\n\nVi o ${product.title} no Ifound e gostaria de saber mais.\n\nLink do produto: ${process.env.NEXT_PUBLIC_URL_SITE!}?q=${product.id}`
	}, [product])

	return (
		<Modal isOpen={isOpen} onClose={onClose} size="5xl">
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{product.title}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<VStack align="flex-end">
						<CardModalProduct
							product={product}
						/>
						<Divider />
						<CardModalSeller
							seller={product.seller}
						/>

						<Link
							href={`https://api.whatsapp.com/send?phone=${product.seller.phone}&text=${encodeURIComponent(message)}`}
							target="_blank"
						>
							<ButtonLeftIcon
								colorScheme="whatsapp"
								label="Entrar em contato"
								icon={RiWhatsappLine}
							/>
						</Link>
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
