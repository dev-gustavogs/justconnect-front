/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Text,
  Card,
  CardBody,
  CardHeader,
  Flex,
  HStack,
  Tag,
} from '@chakra-ui/react';

import { FaUnlockAlt, FaLock } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Link } from 'react-router-dom';
import { UserPostInfo } from '../../interface/UserInterface';

interface Props {
  post: UserPostInfo;
}

export function PostCard({
  post: {
    id,
    username,
    title,
    description,
    score,
    status_open,
    updated_at,
    tags,
    created_at,
    commentCount,
  },
}: Props) {
  const [dateText, setDateText] = useState('');

  //atualiza automaticamente o tempo da postagem a cada 1 min
  useEffect(() => {
    const date = new Date('2024-11-08T21:54:36.849Z');
    const id = setInterval(() => {
      setDateText(formatDistanceToNow(date, { locale: ptBR, addSuffix: true }));
    }, 60000);

    return () => clearInterval(id);
  }, []);

  return (
    <>
      <Card width="100%" shadow={'none'} bg="transparent">
        <CardHeader
          justifyContent="space-between"
          p={0}
          sx={{
            '& > button': {
              minW: '136px',
            },
          }}
        >
          <Flex
            justifyContent={'space-between'}
            alignItems={'center'}
            marginTop={'10px'}
          >
            <Flex
              gap={'15px'}
              fontSize={'12px'}
              marginLeft={'20px'}
              color={'#515151'}
            >
              <Text>{score} curtidas</Text>
              <Text>4 comentários</Text>
            </Flex>
            {status_open ? (
              <FaUnlockAlt color={'#515151'} />
            ) : (
              <FaLock color={'#515151'} />
            )}
          </Flex>
        </CardHeader>
        <CardBody>
          <Link to={'/post/:id'}>
            <Text
              fontSize={'16px'}
              bg="transparent"
              color={'#000000'}
              fontWeight={'500'}
            >
              {title}
            </Text>
          </Link>
          <Text fontSize={'14px'} color={'#111111'} marginTop={'5px'}>
            {description}
          </Text>
        </CardBody>
        <HStack spacing={4} width="100%" justifyContent="space-between">
          <Flex>
            {['md'].map((size) => (
              <Link to={'/tags/:id'}>
                <Tag
                  margin={'15px'}
                  size={size}
                  key={`${size}-1`}
                  variant="solid"
                  colorScheme="blue"
                >
                  +Tag
                </Tag>
              </Link>
            ))}
            {['md'].map((size) => (
              <Link to={'/tags/:id'}>
                <Tag
                  margin={'15px'}
                  size={size}
                  key={`${size}-1`}
                  variant="solid"
                  colorScheme="yellow"
                >
                  +Tag
                </Tag>
              </Link>
            ))}
            {['md'].map((size) => (
              <Link to={'/tags/:id'}>
                <Tag
                  margin={'15px'}
                  size={size}
                  key={`${size}-1`}
                  variant="solid"
                  colorScheme="green"
                >
                  +Tag
                </Tag>
              </Link>
            ))}
          </Flex>
          <Flex direction="column" alignItems="flex-end">
            <Text fontSize="12px" color={'#515151'}>
              {dateText}
            </Text>
            <Link to={'/profile/:id'}>
              <Text fontSize="12px" color="purple">
                @username
              </Text>
            </Link>
          </Flex>
        </HStack>
      </Card>
    </>
  );
}
