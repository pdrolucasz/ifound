import {
	Flex,
	Box,
	Text,
	Avatar,
	AvatarBadge,
	Icon,
	IconButton,
} from '@chakra-ui/react'
import { FC } from 'react'

import { signOut, useSession } from 'next-auth/react'

import { RiLogoutCircleLine } from 'react-icons/ri'

interface ProfileProps {
	showProfileData: boolean
}

export const Profile: FC<ProfileProps> = ({ showProfileData }: ProfileProps) => {
	const { data } = useSession()

	if (!data || !data.user) return null

	return (
		<Flex
			align="center"
		>
			{showProfileData && (
				<Box mr="4" textAlign="right">
					<Text>{data.user.name}</Text>
					<Text
						color="gray.300"
						fontSize="small"
					>
						{data.user.email}
					</Text>
				</Box>
			)}
			<Avatar size="md" name={data.user.name!} src={data.user.image!}>
				<AvatarBadge boxSize="1.25em" borderColor="transparent" bg="black">
					<IconButton
						isRound
						aria-label="Sign out"
						variant="ghost"
						colorScheme="red"
						onClick={() => signOut()}
						icon={<Icon as={RiLogoutCircleLine} w="5" h="5" />}
					/>
				</AvatarBadge>
			</Avatar>
		</Flex>
	)
}
