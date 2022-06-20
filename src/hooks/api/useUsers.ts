import { useQuery } from 'react-query';
import { api } from 'services/api';

interface UserRaw {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface GetUsersResponse {
  totalCount: number;
  users: User[];
}

export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get<UserRaw[]>('/users', {
    params: { page },
  });

  const totalCount = Number(headers['x-total-count']);

  const users = data.map<User>(({ id, name, email, created_at }) => ({
    id,
    name,
    email,
    createdAt: new Date(created_at).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  }));

  return { totalCount, users };
}

export function useUsers(page: number) {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}
