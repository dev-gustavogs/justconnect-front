import {
  Flex,
  IconButton,
  Button,
  useBreakpointValue,
  Link,
  Avatar,
  AvatarBadge,
  Image,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import logoBot from '../../assets/logoBot.svg';
import { SidebarHeaderProps } from '../../interface/SideBarInterface';
import { NotificationsWrapper } from '../Notifications/NotificationsWrapper';
import { useState } from 'react';
import { SearchBar } from '../Search/SearchBar';

const SidebarHeader = ({ onOpen, user }: SidebarHeaderProps) => {
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const [searchVisible, setSearchVisible] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);

  const toggleSearch = () => {
    if (notificationsVisible) {
      setNotificationsVisible(false);
    }
    setSearchVisible(!searchVisible);
  };
  const toggleNotifications = () => {
    if (searchVisible) {
      setSearchVisible(false);
    }
    setNotificationsVisible(!notificationsVisible);
  };

  return (
    <Flex
      position={'fixed'}
      px={4}
      top={0}
      height="90px"
      width="100%"
      alignItems="center"
      bg="#281A45"
      justifyContent="space-between"
      zIndex={2}
    >
      <Flex alignItems="center">
        <IconButton
          visibility={isDesktop ? 'hidden' : 'visible'}
          variant="outline"
          border="none"
          onClick={onOpen}
          aria-label="open menu"
          _hover={'none'}
          _active={'none'}
          icon={<FiMenu size={24} color="#fff" />}
          mr={4}
        />
        <Image
          src={logoBot}
          alt="Logo"
          zIndex={isDesktop ? 2 : 0}
          ml={{ base: '-1', md: '3' }}
          width={{ base: '50px', md: '75px' }}
        />
      </Flex>
      <Flex alignItems="center">
        <SearchBar searchVisible={searchVisible} toggleSearch={toggleSearch} />
        {user ? (
          <>
            <NotificationsWrapper
              notificationsVisible={notificationsVisible}
              toggleNotifications={toggleNotifications}
            />
            <Avatar name={user.name} color="#fff" marginRight="4">
              <AvatarBadge bg="green.500" boxSize="1.25em" />
            </Avatar>
          </>
        ) : (
          <Link href="/login">
            <Button
              w="85px"
              h="34px"
              borderRadius="6px"
              color="#000"
              bg="#fff"
              _hover={{ bg: '#9B71E6', color: '#fff' }}
            >
              Login
            </Button>
          </Link>
        )}
        {isDesktop && !user ? (
          <Link href="/register">
            <Button
              w="85px"
              ml="20px"
              h="34px"
              borderRadius="6px"
              color="#fff"
              bg="#805AD5"
              _hover={{ bg: '#9B71E6', color: '#fff' }}
            >
              Sign up
            </Button>
          </Link>
        ) : (
          ''
        )}
      </Flex>
    </Flex>
  );
};

export default SidebarHeader;
