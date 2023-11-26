import type { AppProps } from 'next/app'
import Head from 'next/head'

import { ChakraProvider, Box, Flex } from '@chakra-ui/react'

import { SessionProvider } from 'next-auth/react'

import { theme } from '@/styles/theme'
import { AppProvider } from '@/contexts'

import { Header } from '@/components/Header'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>IFound</title>
			</Head>
			<SessionProvider>
				<ChakraProvider theme={theme}>
					<AppProvider>
						<Box minH="100vh">
							<Header />
							<Flex p={{ sm: 4, md: 6, lg: 10 }}>
								<Component {...pageProps} />
							</Flex>
						</Box>
					</AppProvider>
				</ChakraProvider>
			</SessionProvider>
		</>
	)
}
