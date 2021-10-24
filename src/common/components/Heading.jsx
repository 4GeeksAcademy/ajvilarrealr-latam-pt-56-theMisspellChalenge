import React from 'react';
import { Heading } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const sizes = {
  /*
    Posible sizes:
    xl => 50px
    l => 40px
    m => 32px
    sm => 26px
    xsm => 22px

    📚 more info here: https://blog.prototypr.io/heading-tags-what-are-they-and-how-to-use-ec7b0973b678
  */
  xl: '50px',
  l: '22px',
  m: '15px',
  sm: '12px',
};

const ThemeHeading = ({
  children, size, ...rest
}) => (
  <Heading fontSize={sizes[size]} {...rest}>
    {children}
  </Heading>
);

ThemeHeading.propTypes = {
  size: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ThemeHeading;
