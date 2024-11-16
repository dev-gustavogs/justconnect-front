import {
  Box,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Tag,
  TagCloseButton,
  useToast,
  Tabs,
  Tab,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FormEvent, useState } from 'react';
import { CreatePost } from '../../service/Post';
import { usePostStore } from '../../store/postStore';
import { useAuthStore } from '../../store/authStore';

export function CreatePostPage() {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();
  const isDesktop = useBreakpointValue({ base: false, md: true });

  const setPosts = usePostStore((state) => state.setPosts);
  const id = useAuthStore((state) => state.id);
  if (!id) {
    return;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await CreatePost({ title, description, tags });
      await setPosts(id);
      toast({
        title: 'Post created.',
        description: 'Your post has been successfully created!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setTitle('');
      setDescription('');
      setTags([]);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred!');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = () => {
    const tagList = newTag
      .split(/[\s,]+/)
      .map((tag) => tag.trim())
      .filter((tag) => tag && !tags.includes(tag));

    setTags([...tags, ...tagList]);
    setNewTag('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <>
      <Tabs mt="4" width="100%">
        <Tab
          pb="3"
          fontWeight="500"
          borderBottom="3px solid"
          width="100%"
          color="#281A45"
          cursor="zoom-in"
        >
          Criar Postagem
        </Tab>
      </Tabs>

      <Box
        maxW="auto"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        {error && (
          <Box mb="4" color="red.500">
            {error}
          </Box>
        )}

        <form onSubmit={handleSubmit}>
          <FormControl
            width={isDesktop ? '550px' : '350px'}
            mb={5}
            mt={isDesktop ? 113 : 50}
          >
            <FormLabel fontWeight="600">Título</FormLabel>
            <Input
              placeholder="Escreva seu título"
              bg="gray.50"
              border="2px solid"
              borderColor="#805AD5"
              focusBorderColor="#805AD5"
              _hover={{ bg: 'gray.200' }}
              _focus={{ bg: 'white' }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              h="40px"
            />
          </FormControl>

          <FormControl width={isDesktop ? '550px' : '350px'} mb={5}>
            <FormLabel fontWeight="600">Descrição</FormLabel>
            <Textarea
              placeholder="Descreva sua postagem"
              bg="gray.50"
              border="2px solid"
              borderColor="#805AD5"
              focusBorderColor="#805AD5"
              _hover={{ bg: 'gray.100' }}
              _focus={{ bg: 'white' }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              height="86px"
            />
          </FormControl>

          <FormControl width={isDesktop ? '550px' : '350px'} mb={5}>
            <FormLabel fontWeight="600">Adicionar Tag</FormLabel>
            <Input
              placeholder="Digite as tags"
              bg="gray.50"
              border="2px solid"
              borderColor="#805AD5"
              focusBorderColor="#805AD5"
              _hover={{ bg: 'gray.200' }}
              _focus={{ bg: 'white' }}
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
            />
            <Box margin="10px 20px" color="gray.500" fontSize="14px">
              <ul>
                <li>
                  <Text>Para criar uma tag pressione Enter</Text>
                </li>
                <li>
                  <Text>
                    Para tags com mais de uma palavra, separe-as com um hífen
                  </Text>
                  <Text>ex: back-end</Text>
                </li>
              </ul>
            </Box>
          </FormControl>

          <FormControl width={isDesktop ? '550px' : '350px'} mb={5}>
            <Box display="flex" flexWrap="wrap" gap="2">
              {tags.map((tag, index) => (
                <Tag
                  key={index}
                  variant="solid"
                  size="md"
                  colorScheme="purple"
                  display="inline-flex"
                  h="24px"
                  backgroundColor="purple.500"
                >
                  {tag}
                  <TagCloseButton onClick={() => handleRemoveTag(tag)} />
                </Tag>
              ))}
            </Box>
          </FormControl>

          <Button
            w="100%"
            h="40px"
            mt={5}
            type="submit"
            bg="#805AD5"
            _hover={{ bg: '#9B71E6' }}
            color="#FFF"
            borderRadius="6px"
            isLoading={loading}
            isDisabled={loading}
          >
            Postar
          </Button>
        </form>
      </Box>
    </>
  );
}
