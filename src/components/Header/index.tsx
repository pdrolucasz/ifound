import {
	Flex,
	useBreakpointValue,
} from '@chakra-ui/react'
import { FC } from 'react'
import { useSession } from 'next-auth/react'

import { Logo } from './Logo'
import { Profile } from './Profile'
import { SignInButton } from './SignInButton'
import { NotificationsNav } from './NotificationsNav'

interface HeaderProps {

}

export const Header: FC<HeaderProps> = () => {
	const { data } = useSession()
	const isWideVersion = useBreakpointValue({
		base: false,
		lg: true
	})

	return (
		<Flex
			as="header"
			w="100%"
			h="20"
			px="6"
			bg="white"
			align="center"
			top="0"
			position="sticky"
			zIndex={2}
			visibility="visible"
			ml="auto"
			shadow="md"
		>
			<Logo />

			<Flex align="center" ml="auto">
				{/* <NotificationsNav /> */}

				{data ? (
					<Profile showProfileData={isWideVersion ?? false} />
				) : (
					<SignInButton />
				)}
			</Flex>
		</Flex>
	)
}
