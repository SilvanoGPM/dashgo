import { Button } from '@chakra-ui/react';

interface PaginationItemProps {
  onPageChange: (page: number) => void;
  number: number;
  isCurrent?: boolean;
}

export function PaginationItem({
  onPageChange,
  number,
  isCurrent = false,
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        colorScheme="pink"
        disabled
        _disabled={{ bg: 'pink.500', cursor: 'default' }}
      >
        {number}
      </Button>
    );
  }

  return (
    <Button
      onClick={() => onPageChange(number)}
      size="sm"
      fontSize="xs"
      width="4"
      bg="gray.700"
      _hover={{ bg: 'gray.500' }}
    >
      {number}
    </Button>
  );
}
