import { Box, Avatar, Heading, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { UserCardData } from '../../interface/UserInterface';

export function UserCard({ name, username, postCount, id }: UserCardData) {
  const navigate = useNavigate();

  function handleOpenProfile(username?: string): void {
    try {
      navigate(`/profile/${username}`);
    } catch {
      throw new Error('Perfil de usuário não encontrado.');
    }
  }

  return (
    <Flex
      id={id}
      onClick={() => handleOpenProfile(username)}
      padding="20px"
      gap="30px"
      align="center"
      width="290px"
      borderWidth="1px"
      borderRadius="lg"
      cursor="pointer"
      background="#FBFBFB"
    >
      <Avatar name={name} fontWeight={800} />
      <Box>
        <Heading size="md">{username}</Heading>
        <p>{postCount} posts</p>
      </Box>
    </Flex>
  );
}
