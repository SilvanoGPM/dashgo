import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import Head from 'next/head';

import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';

import { Input } from 'components/Form/Input';
import { Header } from 'components/Header';
import { Sidebar } from 'components/Sidebar';
import { api } from 'services/api';
import { queryClient } from 'services/queryClient';

interface CreateUserFormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup
    .string()
    .required('Senha obrigatória')
    .min(6, 'No minímo 6 caracteres'),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref('password')], 'As senha precisam ser iguais'),
});

export default function CreateUser() {
  const router = useRouter();

  const createUser = useMutation(
    async (user: CreateUserFormData) => {
      const response = await api.post('/users', {
        user: { ...user, created_at: new Date() },
      });

      return response.data.user;
    },
    {
      onSuccess: () => queryClient.invalidateQueries('users'),
    },
  );

  const { register, handleSubmit, formState } = useForm<CreateUserFormData>({
    resolver: yupResolver(createUserFormSchema),
  });

  const handleCreateUser = handleSubmit(async (data) => {
    await createUser.mutateAsync(data);

    router.push('/users');
  });

  return (
    <>
      <Head>
        <title>Criar usuário - DashGO</title>
      </Head>

      <Box>
        <Header />

        <Flex w="100%" my="6" mx="auto" px="6" maxWidth={1480}>
          <Sidebar />

          <Box
            as="form"
            onSubmit={handleCreateUser}
            flex="1"
            borderRadius={8}
            p={['6', '8']}
            _dark={{ bg: 'gray.800' }}
            _light={{ bg: 'gray.100' }}
          >
            <Heading size="lg" fontWeight="normal">
              Criar usuário
            </Heading>

            <Divider my="6" borderColor="gray.700" />

            <VStack spacing="8">
              <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
                <Input
                  {...register('name')}
                  error={formState.errors.name}
                  label="Nome completo"
                />

                <Input
                  {...register('email')}
                  error={formState.errors.email}
                  type="email"
                  label="E-mail"
                />
              </SimpleGrid>

              <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
                <Input
                  {...register('password')}
                  error={formState.errors.password}
                  type="password"
                  label="Senha"
                />

                <Input
                  {...register('password_confirmation')}
                  error={formState.errors.password_confirmation}
                  type="password"
                  label="Confirmar senha"
                />
              </SimpleGrid>
            </VStack>

            <Flex mt="8" justify="flex-end">
              <HStack spacing={['6', '8']}>
                <Link href="/users" passHref>
                  <Button
                    _dark={{ colorScheme: 'whiteAlpha' }}
                    _light={{ colorScheme: 'aplhaAlpha' }}
                  >
                    Cancelar
                  </Button>
                </Link>

                <Button
                  colorScheme="pink"
                  type="submit"
                  isLoading={formState.isSubmitting}
                >
                  Salvar
                </Button>
              </HStack>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
