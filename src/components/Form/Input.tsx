import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error, ...props },
  ref,
) => {
  return (
    <FormControl isInvalid={Boolean(error)}>
      {Boolean(label) && <FormLabel htmlFor={name}>{label}</FormLabel>}

      <ChakraInput
        ref={ref}
        id={name}
        name={name}
        focusBorderColor="pink.500"
        bgColor="gray.900"
        variant="filled"
        size="lg"
        _hover={{ bgColor: 'gray.900' }}
        {...props}
      />

      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Input = forwardRef<HTMLInputElement, InputProps>(InputBase);
