import Head from 'next/head';
import { Button, Flex, Stack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Router from 'next/router';

import { Input } from 'components/Form/Input';

interface SignInFormData {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória'),
});

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema),
  });

  const handleSignIn = handleSubmit(async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    console.log(data);

    Router.push('/dashboard');
  });

  return (
    <>
      <Head>
        <title>Login - DashGO</title>
      </Head>

      <Flex w="100vw" h="100vh" align="center" justify="center">
        <Flex
          as="form"
          w="100%"
          maxW={360}
          p="8"
          m={[4, 0]}
          borderRadius={8}
          flexDir="column"
          onSubmit={handleSignIn}
          _dark={{ bg: 'gray.800' }}
          _light={{ bg: 'gray.100' }}
        >
          <Stack spacing="4">
            <Input
              {...register('email')}
              error={formState.errors.email}
              type="email"
              label="E-mail"
            />

            <Input
              {...register('password')}
              error={formState.errors.password}
              type="password"
              label="Senha"
            />
          </Stack>

          <Button
            type="submit"
            mt="6"
            colorScheme="pink"
            isLoading={formState.isSubmitting}
          >
            Entrar
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
