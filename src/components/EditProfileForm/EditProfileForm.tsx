import {
  ProfileInfos,
  UpdateProfileInfos,
} from '../../interface/UserInterface';
import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Box,
  Text,
  useToast,
  Textarea,
  InputGroup,
} from '@chakra-ui/react';
import { useProfileStore } from '../../store/profileStore';
import { useAuthStore } from '../../store/authStore';

type Props = {
  user: ProfileInfos;
};

export function EditProfileForm({ user }: Props) {
  const [name, setName] = useState<string>(user.name);
  const [username, setUsername] = useState<string>(user.username);
  const [email, setEmail] = useState<string>(user.email);
  const [bio, setBio] = useState<string | undefined>(user.bio_description);

  const [insta, setInsta] = useState<string | undefined>(user.instagram);
  const [linkedin, setLinkedin] = useState<string | undefined>(user.linkedin);
  const [github, setGithub] = useState<string | undefined>(user.github);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const toast = useToast();
  const id = useAuthStore((state) => state.id);

  const setProfile = useProfileStore((state) => state.setProfile);
  const data: UpdateProfileInfos = {
    name: name,
    username: username,
    email: email,
    bio_description: bio,
    instagram: insta || null,
    github: github || null,
    linkedin: linkedin || null,
  };

  if (!id) {
    return;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      setProfile(id, data);
      toast({
        title: 'Perfil atualizado com sucesso!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });

      navigate('/my-profile');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Ocorreu um erro inesperado!');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <FormControl mb="4">
          <FormLabel htmlFor="name">Nome *</FormLabel>
          <Input
            bg="#fff"
            border="2px solid"
            borderColor="#805AD5"
            focusBorderColor="#805AD5"
            _hover="none"
            width="100%"
            height="41px"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            isDisabled={loading}
            required
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel htmlFor="username">Nome de usuário *</FormLabel>
          <Input
            bg="#fff"
            border="2px solid"
            borderColor="#805AD5"
            focusBorderColor="#805AD5"
            _hover="none"
            width="100%"
            height="41px"
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            isDisabled={loading}
            required
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel htmlFor="bio">Bio</FormLabel>
          <Textarea
            bg="#fff"
            border="2px solid"
            borderColor="#805AD5"
            focusBorderColor="#805AD5"
            _hover="none"
            width="100%"
            height="155px"
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            isDisabled={loading}
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel htmlFor="email">E-mail *</FormLabel>
          <Input
            bg="#fff"
            border="2px solid"
            borderColor="#805AD5"
            focusBorderColor="#805AD5"
            _hover="none"
            width="100%"
            height="41px"
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isDisabled={loading}
            required
          />
        </FormControl>
        <FormLabel htmlFor="instagram">Instagram link</FormLabel>
        <InputGroup mb="4">
          <Input
            name="instagram"
            placeholder="http://instagram.com/"
            bg="#fff"
            border="2px solid"
            borderColor="#805AD5"
            focusBorderColor="#805AD5"
            _hover="none"
            width="100%"
            height="41px"
            id="insta"
            type="text"
            value={insta}
            onChange={(e) => setInsta(e.target.value)}
            isDisabled={loading}
          />
        </InputGroup>
        <FormLabel htmlFor="linkedin">LinkedIn link</FormLabel>
        <InputGroup mb="4">
          <Input
            name="linkedin"
            placeholder="http://linkedin.com/"
            bg="#fff"
            border="2px solid"
            borderColor="#805AD5"
            focusBorderColor="#805AD5"
            _hover="none"
            width="100%"
            height="41px"
            id="linkedin"
            type="text"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            isDisabled={loading}
          />
        </InputGroup>
        <FormLabel htmlFor="github">GitHub link</FormLabel>
        <InputGroup mb="4">
          <Input
            name="github"
            placeholder="http://github.com/"
            bg="#fff"
            border="2px solid"
            borderColor="#805AD5"
            focusBorderColor="#805AD5"
            _hover="none"
            width="100%"
            height="41px"
            id="github"
            type="text"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            isDisabled={loading}
          />
        </InputGroup>

        {error && (
          <Text color="red.500" mb="4">
            {error}
          </Text>
        )}

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
          Atualizar
        </Button>
      </form>
    </Box>
  );
}
