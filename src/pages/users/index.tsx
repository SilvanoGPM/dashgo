import NextLink from 'next/link';
import { useState } from 'react';
import { RiAddLine, RiRefreshLine } from 'react-icons/ri';

import {
  Box,
  Center,
  Checkbox,
  Flex,
  Heading,
  HStack,
  Icon,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Link,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react';

import { Header } from 'components/Header';
import { Sidebar } from 'components/Sidebar';
import { Pagination } from 'components/Pagination';
import { ResponsiveButton } from 'components/ResponsiveButton';
import { useUsers } from 'hooks/api/useUsers';
import { queryClient } from 'services/queryClient';
import { api } from 'services/api';

export default function UsersList() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, error, refetch } = useUsers(page);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const isMediumVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(
      ['user', userId],
      async () => {
        const { data } = await api.get(`/users/${userId}`);

        return data;
      },
      {
        staleTime: 1000 * 60 * 10, // 10 minutes
      },
    );
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" mx="auto" px="6" maxWidth={1480}>
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>

            <HStack>
              <ResponsiveButton
                onlyIcon={!isMediumVersion}
                aria-label="Criar novo usuário"
                onClick={() => refetch()}
                size="sm"
                fontSize="small"
                colorScheme="purple"
                leftIcon={<Icon as={RiRefreshLine} fontSize="20" />}
              >
                Recarregar
              </ResponsiveButton>

              <NextLink href="/users/create" passHref>
                <ResponsiveButton
                  onlyIcon={!isMediumVersion}
                  aria-label="Criar novo usuário"
                  as="a"
                  size="sm"
                  fontSize="small"
                  colorScheme="pink"
                  leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                >
                  Criar novo
                </ResponsiveButton>
              </NextLink>
            </HStack>
          </Flex>

          {isLoading ? (
            <Center h="80%">
              <Spinner />
            </Center>
          ) : error ? (
            <Flex justify="center">
              <Text>Aconteceu um erro ao procurar usuários.</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={['4', '4', '6']} color="gray.300" w="8">
                      <Checkbox colorScheme="pink" />
                    </Th>

                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                  </Tr>
                </Thead>

                <Tbody>
                  {data?.users.map((user) => (
                    <Tr key={user.id}>
                      <Td px={['4', '4', '6']}>
                        <Checkbox colorScheme="pink" />
                      </Td>

                      <Td>
                        <Box>
                          <Link
                            color="purple.400"
                            onMouseEnter={() => handlePrefetchUser(user.id)}
                          >
                            <Text fontWeight="bold">{user.name}</Text>
                          </Link>
                          <Text fontSize="small" color="gray.300">
                            {user.email}
                          </Text>
                        </Box>
                      </Td>

                      {isWideVersion && <Td>{user.createdAt}</Td>}
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              <Pagination
                totalCountOfRegisters={data?.totalCount || 0}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
