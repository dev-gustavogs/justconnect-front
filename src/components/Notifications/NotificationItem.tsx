import { Center, Grid, GridItem, Link, Text } from '@chakra-ui/react';
import { UUID } from 'crypto';

import { DataText } from '../DataText/DataText';
import { useState } from 'react';

interface Props {
  username: string;
  created_at: string | Date;
  content: string;
  post_id: UUID | string;
  isNew: boolean;
}

export function NotificationItem({
  username,
  created_at,
  content,
  post_id,
  isNew,
}: Props) {
  const [n, setN] = useState(isNew);
  return (
    <>
      <Grid
        onMouseOver={() => setN(false)}
        alignItems="center"
        minH="20px"
        gridTemplateColumns="1fr 13fr 2fr"
        overflow="scroll"
      >
        <GridItem>
          {n && (
            <Center
              background="#805AD5"
              height={'8px'}
              width={'8px'}
              rounded={'100px'}
            ></Center>
          )}
        </GridItem>
        <GridItem>
          <Text fontSize="14px" fontWeight="500">
            <Link href={`/profile/${username}`} color="#805AD5">
              @{username}
            </Link>
            <Link href={`/post/${post_id}`}> {content}</Link>
          </Text>
        </GridItem>
        <DataText created={created_at} updated={created_at} sufix={false} />
      </Grid>
    </>
  );
}
