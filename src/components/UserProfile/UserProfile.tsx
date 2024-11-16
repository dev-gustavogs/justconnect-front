import {
  Avatar,
  Box,
  Flex,
  Heading,
  IconButton,
  Link,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { User } from '../../interface/UserInterface';
import {
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineGithub,
} from 'react-icons/ai';

export function UserProfile({
  name,
  username,
  bio_description,
  instagram,
  linkedin,
  github,
}: User) {
  const isDesktop = useBreakpointValue({ base: false, md: true });
  return (
    <>
      <Flex align="top" padding="20px" gap="36px">
        <Avatar name={name} fontWeight={800} size={isDesktop ? 'xl' : 'lg'} />
        <Flex direction="column" gap="13px">
          <Box>
            <Heading size="lg">{name}</Heading>
            <Text color="#805AD5;">@{username}</Text>
          </Box>
          <Text>{bio_description}</Text>
          <Flex gap="45px">
            <Link href={instagram}>
              <IconButton
                variant="plain"
                padding={0}
                size="xs"
                fontSize="24px"
                isDisabled={instagram ? false : true}
                aria-label="instagram"
                cursor="pointer"
                color="#281A45"
                _hover={{
                  color: '#805AD5',
                }}
              >
                <AiOutlineInstagram />
              </IconButton>
            </Link>

            <Link href={linkedin}>
              <IconButton
                variant="plain"
                padding={0}
                size="xs"
                isDisabled={linkedin ? false : true}
                aria-label="linkedin"
                cursor="pointer"
                fontSize="24px"
                color="#281A45"
                _hover={{
                  color: '#805AD5',
                }}
              >
                <AiOutlineLinkedin />
              </IconButton>
            </Link>

            <Link href={github}>
              <IconButton
                variant="plain"
                padding={0}
                size="xs"
                isDisabled={github ? false : true}
                aria-label="github"
                cursor="pointer"
                fontSize="24px"
                color="#281A45"
                _hover={{
                  color: '#805AD5',
                }}
              >
                <AiOutlineGithub />
              </IconButton>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
