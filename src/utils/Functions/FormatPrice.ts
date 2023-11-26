export function FormatPriceCurrency(price: number) {
	return price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
}
