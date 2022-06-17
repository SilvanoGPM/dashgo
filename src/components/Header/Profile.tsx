import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4">
        <Text>Silvano Marques</Text>
        <Text color="gray.300" fontSize="small">
          silvanosilvino@hotmail.com
        </Text>
      </Box>

      <Avatar
        size="md"
        name="Silvano Marques"
        src="https://github.com/SkyG0D.png"
      />
    </Flex>
  );
}
