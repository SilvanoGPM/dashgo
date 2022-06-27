import { ChakraProvider, useColorMode } from '@chakra-ui/react';
import { fireEvent, render, screen } from '@testing-library/react';

import { ToggleTheme } from '../../components/ToggleTheme';

jest.mock('@chakra-ui/react', () => {
  const modules = jest.requireActual('@chakra-ui/react');

  return {
    __esModules: true,
    ...modules,
    useColorMode: jest.fn(),
  };
});

const mockedUseColorMode = useColorMode as jest.Mock;
const mockedToggleColorMode = jest.fn();

describe('<ToggleTheme />', () => {
  beforeAll(() => {
    mockedUseColorMode.mockReturnValue({
      toggleColorMode: mockedToggleColorMode,
    });
  });

  it('should be able to render a button', () => {
    render(<ToggleTheme />, { wrapper: ChakraProvider });

    screen.getByLabelText(/toggle theme/i);
  });

  it('should be able to toggle theme on click', () => {
    render(<ToggleTheme />, { wrapper: ChakraProvider });

    const button = screen.getByLabelText(/toggle theme/i);

    fireEvent.click(button);

    expect(mockedToggleColorMode).toHaveBeenCalled();
  });
});
