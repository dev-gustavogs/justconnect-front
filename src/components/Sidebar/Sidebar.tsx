import {
  Box,
  useColorModeValue,
  useDisclosure,
  useBreakpointValue,
} from '@chakra-ui/react';
import SidebarContent from './SidebarContent';
import SidebarHeader from './SidebarHeader';
import { useProfileStore } from '../../store/profileStore';
import { SidebarProps } from '../../interface/SideBarInterface';

export default function SimpleSidebar({ children }: SidebarProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isDesktop = useBreakpointValue({ base: false, md: true });
  const user = useProfileStore((state) => state.user);

  return (
    <Box
      //se mexe aqui para tirar o bd gray.100
      minH="100vh"
      bg={useColorModeValue('gray.50', 'gray.900')}
      position="relative"
    >
      <SidebarContent
        isUserLoggedIn={!!user}
        isOpen={isOpen}
        onClose={onClose}
      />
      <SidebarHeader onOpen={onOpen} user={user} />
      <Box position="relative" zIndex={1} ml={isDesktop ? '250px' : '0'}>
        {children}
      </Box>

      {!isDesktop && isOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bg="black"
          opacity="0.5"
          zIndex={1}
          onClick={onClose}
        />
      )}
    </Box>
  );
}
