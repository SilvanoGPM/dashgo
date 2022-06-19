import { useQuery } from 'react-query';
import { api } from 'services/api';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export async function getUsers() {
  const { data } = await api.get<{ users: User[] }>('/users');

  const users = data.users.map<User>(({ id, name, email, createdAt }) => ({
    id,
    name,
    email,
    createdAt: new Date(createdAt).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  }));

  return users;
}

export function useUsers() {
  return useQuery(
    'users',
    getUsers,
    { staleTime: 1000 * 5 }, // five seconds,
  );
}
