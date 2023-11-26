import type { NextApiRequest, NextApiResponse } from 'next'
import { query as q } from 'faunadb'
import { fauna } from "@/services/fauna"

type ResponseData = {
	type: 'success' | 'error' | 'warning' | 'info'
	message: string
	products?: any
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	if (req.method === 'GET') {
		const response = await fauna.query<any>(
			q.Map(
				q.Paginate(q.Documents(q.Collection('products'))/*, { size: 5 }*/),
				q.Lambda('x', q.Get(q.Var('x')))
			)
		)

		const products = response.data.map((product: any) => ({
			id: product.ref.id,
			title: product.data.title,
			description: product.data.description,
			price: product.data.price / 100,
			image: product.data.image,
		}))

		return res.status(200).json({ type: 'success', message: 'Busca concluída!', products })
	}
}
