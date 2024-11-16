import { Box, Text } from '@chakra-ui/react';
import { UserProfile } from '../../components/UserProfile/UserProfile';
import { User, UserPostInfo } from '../../interface/UserInterface';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserData } from '../../service/Users';
import { PostCard } from '../../components/PostCard/PostCard';

export function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>();
  const [posts, setPosts] = useState<UserPostInfo[]>([]);
  const url = useParams();
  const username = url.username;

  const getUser = async (username?: string) => {
    if (!username) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetchUserData(username);
      setUser(response);
      if (response.posts) {
        setPosts(response.posts.reverse());
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser(username);
  }, [url, username]);

  if (!user) {
    return;
  }
  return (
    <>
      {loading ? (
        <Text>loading...</Text>
      ) : (
        <>
          <Box borderBottom="1px solid #B6B4BB">
            <UserProfile {...user} />
          </Box>
          <Box mt="30px">
            {posts && posts.length > 0 ? (
              posts.map((p) => {
                return (
                  <Box borderBottom="1px solid #DEDEDE">
                    <PostCard post={p} />
                  </Box>
                );
              })
            ) : (
              <Text textAlign="center" color="gray.500">
                {user.name} ainda não possui postagens
              </Text>
            )}
          </Box>
        </>
      )}
    </>
  );
}
