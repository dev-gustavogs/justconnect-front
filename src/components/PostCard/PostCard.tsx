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
import { Link } from 'react-router-dom';
import { UserPostInfo } from '../../interface/UserInterface';
import { DataText } from '../DataText/DataText';

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
  //falar com o back pra retornar o user_id de volta
  return (
    <>
      <Card paddingRight="20px" width="100%" shadow={'none'} bg="transparent">
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
              <Text>{commentCount} comentários</Text>
            </Flex>
            {status_open ? (
              <FaUnlockAlt color={'#515151'} />
            ) : (
              <FaLock color={'#515151'} />
            )}
          </Flex>
        </CardHeader>
        <CardBody>
          <Link to={`/post/${id}`}>
            <Text
              fontSize={'16px'}
              bg="transparent"
              fontWeight={'500'}
              _hover={{ color: '#805AD5' }}
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
            {['md'].map((size) =>
              tags.map((t) => {
                return (
                  <Link to={`/tags/${t}`}>
                    <Tag
                      margin={'15px'}
                      size={size}
                      key={`${size}-1`}
                      variant="solid"
                      background="#805AD5"
                      _hover={{ background: '#815ad5d8' }}
                    >
                      {t}
                    </Tag>
                  </Link>
                );
              })
            )}
          </Flex>
          <Flex direction="column" alignItems="flex-end">
            <DataText created={created_at} updated={updated_at} sufix={true} />
            <Link to={`/profile/${username}`}>
              <Text
                fontSize="12px"
                fontFamily="montserrat"
                color="#805AD5"
                _hover={{ color: '#281A45' }}
              >
                @{username}
              </Text>
            </Link>
          </Flex>
        </HStack>
      </Card>
    </>
  );
}
