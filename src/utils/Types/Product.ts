export type ListSeller = {
	id: string
	name: string
	subtitle: string
	description: string
	avatar: string
	phone: string
}

export type ListProduct = {
	id: string
	title: string
	description: string
	price: number
	image: string
	seller: ListSeller
}

export type ListProductCart = {
	id: string
	title: string
	description: string
	price: number
	image: string
	amount: number
	seller: ListSeller
}
