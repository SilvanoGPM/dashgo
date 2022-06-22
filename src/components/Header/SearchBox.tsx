import { Flex, Icon, Input } from '@chakra-ui/react';

import { RiSearchLine } from 'react-icons/ri';

export function SearchBox() {
  return (
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      ml="6"
      maxW={400}
      alignSelf="center"
      pos="relative"
      borderRadius="full"
      cursor="pointer"
      _dark={{ color: 'gray.200', bg: 'gray.800' }}
      _light={{ color: 'gray.700', bg: 'gray.100' }}
    >
      <Input
        variant="unstyled"
        placeholder="Buscar na plataforma"
        px="4"
        mr="4"
        _dark={{ color: 'gray.50' }}
        _light={{ color: 'gray.900' }}
        _placeholder={{
          _dark: { color: 'gray.400' },
          _light: { color: 'gray.700' },
        }}
      />

      <Icon as={RiSearchLine} fontSize="20" />
    </Flex>
  );
}
