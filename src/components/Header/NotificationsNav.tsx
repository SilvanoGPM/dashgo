import { HStack, Icon } from '@chakra-ui/react';

import { IconButton } from 'components/IconButton';
import { ToggleTheme } from 'components/ToggleTheme';

import { RiNotificationLine, RiUserAddLine } from 'react-icons/ri';

export function NotificationsNav() {
  return (
    <HStack
      spacing={['2']}
      mx={['4', '6']}
      pr={['4', '6']}
      py="1"
      color="gray.300"
      borderRightWidth={1}
      borderColor="gray.700"
    >
      <IconButton
        aria-label="Show notifications"
        icon={<Icon as={RiNotificationLine} fontSize="20" />}
      />

      <IconButton
        aria-label="Show friends request"
        icon={<Icon as={RiUserAddLine} fontSize="20" />}
      />

      <ToggleTheme />
    </HStack>
  );
}
