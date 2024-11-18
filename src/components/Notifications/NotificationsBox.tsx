import {
  CloseButton,
  Card,
  CardHeader,
  Heading,
  useBreakpointValue,
  Flex,
  CardBody,
  Box,
} from '@chakra-ui/react';
import { NotificationItem } from './NotificationItem';
import { UserNotifications } from '../../interface/UserInterface';

interface Props {
  handleClose: () => void;
  notifications: UserNotifications[];
}
export function NotificationsBox({ handleClose, notifications }: Props) {
  const isDesktop = useBreakpointValue({ base: false, md: true });
  //alterar aqui com a integração do backend

  return (
    <>
      <Card
        bg="gray.50"
        width={isDesktop ? '400px' : '330px'}
        maxHeight={isDesktop ? '450px' : '400px'}
        overflow={'auto'}
      >
        <CardHeader paddingBottom={0}>
          <Flex justify="space-between">
            <Heading size="lg">Notificações</Heading>
            <CloseButton onClick={handleClose} />
          </Flex>
        </CardHeader>
        <CardBody>
          {notifications.map((n: UserNotifications) => {
            return (
              <Box
                borderBottom="1px solid #DEDEDE"
                paddingY="15px"
                _hover={{
                  background:
                    'hsl(258.5365853658536, 70.42028985507248%, 95.411764705882355%)',
                }}
              >
                <NotificationItem
                  username={n.username}
                  created_at={n.created_at}
                  content={n.content}
                  post_id={n.post_id}
                  isNew={n.isNew}
                />
              </Box>
            );
          })}
        </CardBody>
      </Card>
    </>
  );
}
