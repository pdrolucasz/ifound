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
				q.Lambda(
					'sellerRef',
					q.Let(
						{
							product: q.Get(q.Var('sellerRef')),
							seller: q.Get(q.Select(['data', 'sellerRef'], q.Var('product')))
						},
						{
							product: q.Var('product'),
							seller: q.Var('seller')
						}
					)
				)
			)
		)

		const products = response.data.map((resp: any) => ({
			id: resp.product.ref.id,
			title: resp.product.data.title,
			description: resp.product.data.description,
			price: resp.product.data.price / 100,
			image: resp.product.data.image,
			seller: {
				id: resp.seller.ref.id,
				name: resp.seller.data.name,
				subtitle: resp.seller.data.subtitle,
				description: resp.seller.data.description,
				avatar: resp.seller.data.avatar,
			}
		}))

		return res.status(200).json({ type: 'success', message: 'Busca concluída!', products })
	}
}
