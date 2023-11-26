import { Text } from '@chakra-ui/react'

import { FC } from 'react'

interface LogoProps {

}

export const Logo: FC<LogoProps> = () => {
	return (
		<Text
			fontSize={["2xl", "3xl"]}
			fontWeight="bold"
			letterSpacing="tight"
			w="64"
		>
			IFound
			<Text as="span" ml="1" color="orange.500">.</Text>
		</Text>
	)
}
