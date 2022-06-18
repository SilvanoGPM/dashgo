import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

interface ProfileProps {
  showData?: boolean;
}

export function Profile({ showData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showData && (
        <Box mr="4" flex={0}>
          <Text>Silvano Marques</Text>
          <Text color="gray.300" fontSize="small">
            silvanosilvino@hotmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Silvano Marques"
        src="https://github.com/SkyG0D.png"
      />
    </Flex>
  );
}
