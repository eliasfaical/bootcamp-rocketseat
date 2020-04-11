import React from 'react';

import {Wrapper, Container, Logo, BoxIconCart, Cart, CountItem} from './styles';

function Header() {
  return (
    <Wrapper>
      <Container>
        <Logo />
        <BoxIconCart>
          <Cart>Cart</Cart>
          <CountItem>0</CountItem>
        </BoxIconCart>
      </Container>
    </Wrapper>
  );
}

export default Header;
