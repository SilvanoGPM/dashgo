import {
  Link,
  Text,
  Icon,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react';
import { ActiveLink } from 'components/ActiveLink';

import { ElementType } from 'react';

interface NavLinkProps extends ChakraLinkProps {
  icon: ElementType;
  children: string;
  href: string;
}

export function NavLink({ icon, children, href, ...props }: NavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <Link display="flex" alignItems="center" {...props}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">
          {children}
        </Text>
      </Link>
    </ActiveLink>
  );
}
