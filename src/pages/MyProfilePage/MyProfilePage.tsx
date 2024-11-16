import { Box, Flex, Icon, Link, Text } from '@chakra-ui/react';
import { UserProfile } from '../../components/UserProfile/UserProfile';
import { MdEdit } from 'react-icons/md';
import { useProfileStore } from '../../store/profileStore';
import { useNavigate } from 'react-router-dom';
import { usePostStore } from '../../store/postStore';
import { PostCard } from '../../components/PostCard/PostCard';
import { useEffect, useState } from 'react';

export function MyProfilePage() {
  const user = useProfileStore((state) => state.user);
  const navigate = useNavigate();
  const posts = usePostStore((state) => state.posts);
  const [postsOrdered, setPostsOrdered] = useState(posts);

  useEffect(() => {
    if (posts) {
      setPostsOrdered(posts.reverse());
    }
  }, [posts]);

  console.log(posts);
  console.log(postsOrdered);

  const handleEdit = () => {
    navigate('/my-profile/edit');
  };

  return (
    <>
      <Flex width="100%" justifyContent="right">
        <Link onClick={handleEdit}>
          <Icon
            mt="15px"
            aria-label="editar"
            cursor="pointer"
            fontSize="24px"
            color="#281A45"
            _hover={{ color: '#805AD5' }}
          >
            <MdEdit />
          </Icon>
        </Link>
      </Flex>
      <Box borderBottom="1px solid #B6B4BB">
        {user ? <UserProfile {...user} /> : <p> erro ao carregar usuário</p>}
      </Box>
      <Box mt="30px">
        {postsOrdered && postsOrdered.length > 0 ? (
          postsOrdered.map((p) => {
            return (
              <Box borderBottom="1px solid #DEDEDE">
                <PostCard post={p} />
              </Box>
            );
          })
        ) : (
          <Text textAlign="center" color="gray.500">
            Você ainda não possui postagens
          </Text>
        )}
      </Box>
    </>
  );
}
