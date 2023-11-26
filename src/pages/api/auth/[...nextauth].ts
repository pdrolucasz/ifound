import { query as q } from 'faunadb'

import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import { fauna } from '@/services/fauna'

export default NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],

	// jwt: {
	//   signingKey: process.env.SIGNING_KEY,
	// },

	callbacks: {
		// async session({ session }) {
		// 	try {
		// 		const userActiveSubscription = await fauna.query(
		// 			q.Get(
		// 				q.Intersection([
		// 					q.Match(
		// 						q.Index('subscription_by_user_ref'),
		// 						q.Select(
		// 							'ref',
		// 							q.Get(
		// 								q.Match(
		// 									q.Index('user_by_email'),
		// 									q.Casefold(session.user.email)
		// 								)
		// 							)
		// 						)
		// 					),
		// 					q.Match(
		// 						q.Index('subscription_by_status'),
		// 						'active'
		// 					)
		// 				])
		// 			)
		// 		)

		// 		return {
		// 			...session,
		// 			activeSubscription: userActiveSubscription
		// 		}
		// 	} catch {
		// 		return {
		// 			...session,
		// 			activeSubscription: null
		// 		}
		// 	}
		// },

		async signIn({ user, profile }) {
			try {
				if (user && user.email) {
					const { email } = user
					console.log('aqui1')
					await fauna.query(
						q.If(
							q.Not(
								q.Exists(
									q.Match(
										q.Index('user_by_email'),
										q.Casefold(user.email)
									)
								)
							),
							q.Create(
								q.Collection('users'),
								{ data: { email } }
							),
							q.Get(
								q.Match(
									q.Index('user_by_email'),
									q.Casefold(user.email)
								)
							)
						)
					)
					console.log('aqui2')
					return true
				}
				return false
			} catch (err) {
				console.log(err)
				return false
			}
		}
	}
})
