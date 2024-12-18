import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Box,
  Text,
  Link,
  Flex,
  useToast, // Importa o hook useToast do Chakra UI
  Image,
  useBreakpointValue,
} from '@chakra-ui/react';
import { signUp } from '../../service/Auth';
import logoAuth from '../../assets/logoAuth.svg';
import { useAuthStore } from '../../store/authStore';

export function RegisterPage() {
  const [name, setName] = useState<string>('');

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const toast = useToast();
  const isDesktop = useBreakpointValue({ base: false, md: true });

  const { loginUser, token } = useAuthStore();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError('As senhas não conferem!');
      setLoading(false);
      return;
    }

    try {
      await signUp({
        name,
        username,
        password,
        email,
        confirmPassword,
      });
      handleLogin();
      toast({
        title: 'Login realizado com sucesso!',
        description: `Bem-vindo, ${username}!`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
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

  const handleLogin = async () => {
    try {
      await loginUser(username, password);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Ocorreu um erro inesperado!');
      }
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/my-profile');
    }
  }, [token, navigate]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height={isDesktop ? '135vh' : '110vh'}
      padding="16px"
    >
      <Box width="476px">
        <Image
          src={logoAuth}
          margin={'auto'}
          alt="Logo"
          width={isDesktop ? '170px' : '140px'}
          mt="60px"
        />
        <form onSubmit={handleSubmit}>
          <Flex flexDirection="column" alignItems="center">
            <FormControl mt="4" mb="4">
              <FormLabel htmlFor="name">Nome</FormLabel>
              <Input
                bg="gray.50"
                border="2px solid"
                borderColor="#805AD5"
                focusBorderColor="#805AD5"
                _hover={{ bg: 'gray.200' }}
                _focus={{ bg: 'white' }}
                width="100%"
                height="41px"
                id="username"
                placeholder="Digite seu nome completo"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                isDisabled={loading}
              />
            </FormControl>
            <FormControl mt="2" mb="4">
              <FormLabel htmlFor="username">Nome do usuário</FormLabel>
              <Input
                bg="gray.50"
                border="2px solid"
                borderColor="#805AD5"
                focusBorderColor="#805AD5"
                _hover={{ bg: 'gray.200' }}
                _focus={{ bg: 'white' }}
                width="100%"
                height="41px"
                id="username"
                placeholder="Digite seu nome de usuário"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                isDisabled={loading}
              />
            </FormControl>
            <FormControl mt="2" mb="4">
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                display="flex"
                placeholder="Digite seu email"
                bg="gray.50"
                border="2px solid"
                borderColor="#805AD5"
                focusBorderColor="#805AD5"
                _hover={{ bg: 'gray.200' }}
                _focus={{ bg: 'white' }}
                width="100%"
                height="41px"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isDisabled={loading}
              />
            </FormControl>
            <FormControl mt="2" mb="4">
              <FormLabel htmlFor="password">Senha</FormLabel>
              <Input
                bg="gray.50"
                border="2px solid"
                borderColor="#805AD5"
                focusBorderColor="#805AD5"
                _hover={{ bg: 'gray.200' }}
                _focus={{ bg: 'white' }}
                width="100%"
                height="41px"
                id="password"
                placeholder="Digite sua senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isDisabled={loading}
              />
            </FormControl>

            <FormControl mt="2" mb="4">
              <FormLabel htmlFor="confirmPassword">Confirmar senha</FormLabel>
              <Input
                bg="gray.50"
                border="2px solid"
                borderColor="#805AD5"
                focusBorderColor="#805AD5"
                _hover={{ bg: 'gray.200' }}
                _focus={{ bg: 'white' }}
                width="100%"
                height="41px"
                id="confirmPassword"
                placeholder="Confirme sua senha"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                isDisabled={loading}
              />
            </FormControl>

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
              Registrar
            </Button>
            <Box mb="2" mt={8}>
              Já possui uma conta?{' '}
              <Link href="/login" color="#2F00FF">
                Fazer login
              </Link>
            </Box>
          </Flex>
        </form>
      </Box>
    </Box>
  );
}
