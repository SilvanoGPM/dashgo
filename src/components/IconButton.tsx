import {
  IconButton as ChakraIconButton,
  IconButtonProps as ChakraIconButtonProps,
} from '@chakra-ui/react';

export function IconButton(props: ChakraIconButtonProps) {
  return (
    <ChakraIconButton
      variant="ghost"
      _dark={{ colorScheme: 'whiteAlpha', color: 'gray.300' }}
      _light={{ colorScheme: 'blackAlpha', color: 'gray.600' }}
      {...props}
    />
  );
}
