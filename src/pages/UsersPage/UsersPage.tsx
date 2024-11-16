import {
  Grid,
  Input,
  InputGroup,
  InputLeftElement,
  Tab,
  Tabs,
  Button,
  Stack,
} from '@chakra-ui/react';
import { UserCard } from '../../components/UserCard/UserCard';
import { FiSearch } from 'react-icons/fi';
import { fetchUsersList } from '../../service/Users';
import { useEffect, useState } from 'react';
import { UserCardData } from '../../interface/UserInterface';

export function UsersPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<UserCardData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<UserCardData[]>([]);

  const getUsersList = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetchUsersList(page, 16);
      if (response) {
        setUsers(response.users);
        setFilteredUsers(response.users);
        setTotalPages(response.totalPages);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredUsers(users.filter(user => user.username.toLowerCase().includes(term)));
  };

  useEffect(() => {
    getUsersList(page);
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <Tabs width="100%">
        <Tab width="100%" color="#281A45" cursor="zoom-in">
          Usuários
        </Tab>
      </Tabs>

      <InputGroup
        background="gray.100"
        margin="30px auto"
        borderRadius={6}
        width="70%"
        borderColor="gray.400"
      >
        <InputLeftElement children={<FiSearch color="gray.300" />} />
        <Input
          placeholder="Pesquisar usuário"
          value={searchTerm}
          onChange={handleSearch}
        />
      </InputGroup>

      {loading ? (
        <p>carregando...</p>
      ) : (
        <>
          <Grid
            justifyItems="center"
            templateColumns={{
              base: 'repeat(1, 1fr)',
              sm: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(2, 1fr)',
            }}
            gap="15px"
            overflow="hidden"
          >
            {filteredUsers.map((u: UserCardData) => (
              <UserCard
                key={u.id}
                name={u.name}
                username={u.username}
                postCount={u.postCount}
                id={u.id}
              />
            ))}
          </Grid>

          {/* Pagination Controls */}
          <Stack direction="row" spacing={4} align="center" justify="center" mt={4}>
            <Button
              onClick={() => handlePageChange(page - 1)}
              isDisabled={page === 1}
            >
              Anterior
            </Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                isActive={page === i + 1}
              >
                {i + 1}
              </Button>
            ))}
            <Button
              onClick={() => handlePageChange(page + 1)}
              isDisabled={page === totalPages}
            >
              Próxima
            </Button>
          </Stack>
        </>
      )}
    </>
  );
}
