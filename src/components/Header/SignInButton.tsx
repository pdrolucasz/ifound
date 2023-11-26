import { Button, HStack, Icon, Text } from '@chakra-ui/react'
import { signIn } from 'next-auth/react'

import { RiGoogleFill } from 'react-icons/ri'

export const SignInButton = () => {
	return (
		<Button
			size="lg"
			rounded="full"
			colorScheme="gray"
			onClick={() => signIn('google')}
			ml="auto"
		>
			<HStack align="center">
				<Icon as={RiGoogleFill} color="orange" />
				<Text fontSize={['sm', 'md']}>Login com google</Text>
			</HStack>
		</Button>
	)
}
