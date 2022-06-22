import { Icon, IconButtonProps, useColorMode } from '@chakra-ui/react';
import { RiMoonClearLine, RiSunCloudyLine } from 'react-icons/ri';

import { IconButton } from './IconButton';

export function ToggleTheme(props: Omit<IconButtonProps, 'aria-label'>) {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Toggle theme"
      icon={
        <Icon as={colorMode === 'dark' ? RiMoonClearLine : RiSunCloudyLine} />
      }
      onClick={toggleColorMode}
      {...props}
    />
  );
}
