import { Flex, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { RiMenuLine } from 'react-icons/ri';

import { useSidebarDrawer } from 'contexts/SidebarDrawerContext';

import { Logo } from './Logo';
import { NotificationsNav } from './NotificationsNav';
import { Profile } from './Profile';
import { SearchBox } from './SearchBox';

export function Header() {
  const drawer = useSidebarDrawer();

  const screenVersion = useBreakpointValue({
    base: 0,
    sm: 1,
    md: 2,
    lg: 3,
  });

  const isMediumVersion = (screenVersion || 0) >= 2;

  const isWideVersion = (screenVersion || 0) >= 3;

  return (
    <Flex
      as="header"
      w="100%"
      maxW={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      {!isWideVersion && (
        <IconButton
          aria-label="Open navigation"
          icon={<Icon as={RiMenuLine} fontSize="24" />}
          variant="unstyled"
          onClick={drawer.onOpen}
          mr="2"
        />
      )}

      <Logo />

      {isWideVersion && <SearchBox />}

      <Flex align="center" ml="auto">
        <NotificationsNav showOnlyThemeSwitcher={!isMediumVersion} />

        <Profile showData={isWideVersion} />
      </Flex>
    </Flex>
  );
}
