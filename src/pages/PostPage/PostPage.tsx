import { Divider, Tag, Box, Text, Textarea, Button } from '@chakra-ui/react';
import { MdArrowUpward, MdMoreVert } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostById } from '../../service/Post';
import { UserPostById } from '../../interface/UserInterface';
import { UUID } from 'crypto';

export function PostPage() {
  const { id } = useParams<{ id: string | UUID }>();
  const [post, setPost] = useState<UserPostById | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getPost = async (id?: string | UUID) => {
    if (!id) {
      return;
    }
    setLoading(true); 
    try {
      const response = await fetchPostById(id);
      setPost(response); 
    } catch (error) {
      console.error('Erro ao buscar post:', error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    if (id) {
      getPost(id);
    }
  }, [id]);

  if (loading) return <Text>Carregando...</Text>;

  if (!post) return <Text>Post não encontrado</Text>;

  return (
    <Box>
      <Box mt="39px" display="flex" gap="35px">
        <Text color="#805AD5" fontSize="14px" fontWeight="500" lineHeight="20px">
          @{post.username}
        </Text>
        <Text fontSize="12px" fontWeight="500" color="#515151">
          {new Date(post.created_at).toLocaleDateString()}
        </Text>
        <MdMoreVert style={{ marginLeft: '100px' }} />
      </Box>

      <Text mt="9px" color="#000" fontSize="16px" fontWeight="600">
        {post.title}
      </Text>

      <Box mt="8px" display="flex" alignItems="center">
        <Box display="flex" flexDirection="column" alignItems="center">
          <MdArrowUpward style={{ width: '20px', height: '24px' }} />
          <Text fontSize="16px" fontWeight="600" color="#000">
            {post.score}
          </Text>
        </Box>
        <Text marginLeft="37px" mt="8px" color="#111" fontSize="14px" fontWeight="500">
          {post.description}
        </Text>
      </Box>

      <Box marginLeft="126px" mt="28px" display="flex">
        {post.tags.map((tag, index) => (
          <Tag key={index} size="md" variant="solid" colorScheme="purple" marginLeft={index > 0 ? '14px' : '0'}>
            {tag}
          </Tag>
        ))}
      </Box>

      <Box>
        <Divider mt="15px" background="#DEDEDE" height="1px" />
        <Text marginLeft="6px" mt="5px" color="#515151" fontSize="12px" fontWeight="500">
          {post.comment.length} comentário{post.comment.length !== 1 ? 's' : ''}
        </Text>
      </Box>

      {post.comment.map((comment) => (
        <Box key={comment.id} mt="20px">
          <MdMoreVert style={{ marginTop: '20px', marginLeft: '328px' }} />
          <Box mt="8px" display="flex" alignItems="center">
            <Box marginLeft="30px" display="flex" flexDirection="column" alignItems="center">
              <MdArrowUpward style={{ width: '20px', height: '24px' }} />
              <Text fontSize="16px" fontWeight="600" color="#000">
                {comment.score}
              </Text>
            </Box>
            <Text marginLeft="26px" mt="8px" color="#111" fontSize="14px" fontWeight="400">
              {comment.content}
            </Text>
          </Box>
          <Text mt="14px" paddingLeft="278px" color="#515151" fontSize="12px" fontWeight="500" lineHeight="20px">
            {new Date(comment.created_at).toLocaleDateString()}
          </Text>
          <Text color="#805AD5" paddingLeft="274px" fontSize="12px" fontWeight="500" lineHeight="20px">
            @{comment.username}
          </Text>
          <Divider mt="15px" background="#DEDEDE" height="1px" mx="auto" maxWidth="85%" />
        </Box>
      ))}

      <Box mt="30px">
        <Text color="#281A45" fontSize="18px" fontWeight="500">
          Responder
        </Text>
        <Textarea borderRadius="6px" border="2px solid #805AD5" mt="21px" placeholder="Descreva sua resposta" width="320px" height="84px" />
        <Button padding="0px 24px" justifyContent="center" alignItems="center" mt="33px" size="lg" variant="solid" colorScheme="purple" width="320px" h="38px">
          Responder
        </Button>
      </Box>
    </Box>
  );
}
