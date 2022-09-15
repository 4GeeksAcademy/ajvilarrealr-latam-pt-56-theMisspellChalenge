import { useColorModeValue, useMediaQuery } from '@chakra-ui/react';

export const currentTheme = useColorModeValue('light', 'dark');

const [isBelowLaptop] = useMediaQuery('(max-width: 996px)');
const [isBelowTablet] = useMediaQuery('(max-width: 768px)');

//                                          gray.200    gray.500
const commonBorderColor = useColorModeValue('#E2E8F0', '#718096');
const bgColor = useColorModeValue('#FFFFFF', '#17202A');

export const screen = {
  isBelowLaptop,
  isBelowTablet,
};

export const configColors = {
  commonBorderColor,
  bgColor,
};

export const getSlideProps = (open) => {
  const config = {
    minWidth: '290px',
    zIndex: 1200,
    position: isBelowLaptop ? 'inherit' : 'sticky',
    backgroundColor: bgColor,
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 auto',
    width: 'inherit',
    transform: open ? 'translateX(0rem)' : 'translateX(-30rem)',
    visibility: open ? 'visible' : 'hidden',
    height: isBelowTablet ? '100%' : '100vh',
    outline: 0,
    borderRight: 1,
    borderStyle: 'solid',
    // overflowX: 'hidden',
    // overflowY: 'auto',
    borderColor: commonBorderColor,
    transition: open ? 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms' : 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    transitionProperty: open ? 'transform' : 'box-shadow',
    transitionDuration: open ? '225ms' : '300ms',
    transitionTimingFunction: open ? 'cubic-bezier(0, 0, 0.2, 1)' : 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDelay: open ? '0ms' : '0ms',
  };
  return config;
};
