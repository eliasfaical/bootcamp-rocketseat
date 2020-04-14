import React from 'react';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Wrapper,
  Container,
  Logo,
  BoxIconCart,
  CountItem,
  ButtonLogo,
} from './styles';

Icon.loadFont();

function Header({navigation}) {
  return (
    <Wrapper>
      <Container>
        <ButtonLogo onPress={() => navigation.navigate('Home')}>
          <Logo />
        </ButtonLogo>
        <BoxIconCart onPress={() => navigation.navigate('Cart')}>
          <Icon name="shopping-basket" color="#FFF" size={24} />
          <CountItem>0</CountItem>
        </BoxIconCart>
      </Container>
    </Wrapper>
  );
}

export default Header;
