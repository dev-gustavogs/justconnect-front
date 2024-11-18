import { Box, Flex, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { NotificationsBox } from './NotificationsBox';
import { LuBellDot, LuBell } from 'react-icons/lu';
import { UserNotifications } from '../../interface/UserInterface';
import { useEffect, useState } from 'react';

interface Props {
  notificationsVisible: boolean;
  toggleNotifications: () => void;
}

export function NotificationsWrapper({
  notificationsVisible,
  toggleNotifications,
}: Props) {
  const [hasNew, setHasNew] = useState(false);
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const [notificationsList, setNotificationsList] = useState<
    UserNotifications[]
  >([
    {
      username: 'teste',
      created_at: '2024-11-13T15:09:16.607Z',
      content: 'respondeu seu post',
      post_id: '6832a721-3d62-41e7-b69-a843261c00cb',
      isNew: true,
    },
    {
      username: 'claraadm',
      created_at: '2024-11-13T17:27:51.745Z',
      content: 'curtiu seu comentário',
      post_id: '6832a721-3d62-41e7-b69-a843261c00cb',
      isNew: true,
    },
    {
      username: 'juninhoplayboy',
      created_at: '2024-11-13T17:27:51.745Z',
      content: 'curtiu seu comentário',
      post_id: '6832a721-3d62-41e7-b69-a843261c00cb',
      isNew: false,
    },
    {
      username: 'juninhoplayboy',
      created_at: '2024-11-13T17:27:51.745Z',
      content: 'curtiu seu comentário',
      post_id: '6832a721-3d62-41e7-b69-a843261c00cb',
      isNew: false,
    },
    {
      username: 'juninhoplayboy',
      created_at: '2024-11-13T17:27:51.745Z',
      content: 'curtiu seu comentário',
      post_id: '6832a721-3d62-41e7-b69-a843261c00cb',
      isNew: false,
    },
    {
      username: 'juninhoplayboy',
      created_at: '2024-11-13T17:27:51.745Z',
      content: 'curtiu seu comentário',
      post_id: '6832a721-3d62-41e7-b69-a843261c00cb',
      isNew: false,
    },
  ]);
  const handleClose = () => {
    toggleNotifications();
    setNotificationsList((prev: UserNotifications[]) =>
      prev.map((notification) => ({ ...notification, isNew: false }))
    );
  };

  useEffect(() => {
    setHasNew(notificationsList.some((notification) => notification.isNew));
  }, [notificationsList]);

  return (
    <>
      <IconButton
        variant="outline"
        bg={notificationsVisible ? '#805AD5' : 'transparent'}
        border="none"
        aria-label="notifications"
        icon={
          hasNew ? (
            <LuBellDot color="#fff" size={24} />
          ) : (
            <LuBell color="#fff" size={24} />
          )
        }
        _hover={{ color: '#fff', bg: '#805AD5' }}
        marginRight="4"
        onClick={notificationsVisible ? handleClose : toggleNotifications}
      ></IconButton>
      {notificationsVisible && (
        <>
          <Flex
            zIndex={2}
            position="fixed"
            top="90px"
            left={0}
            w={'full'}
            justify={isDesktop ? 'right' : 'center'}
            paddingRight={isDesktop ? '5%' : 0}
          >
            <NotificationsBox
              handleClose={handleClose}
              notifications={notificationsList}
            />
          </Flex>
          <Box
            position="fixed"
            top="90px"
            left="0"
            width="100%"
            height="100%"
            bg="black"
            opacity="0.5"
            zIndex={1}
            onClick={toggleNotifications}
          />
        </>
      )}
    </>
  );
}
