import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';

// import { Container } from './styles';

const Profile = () => {
  return <Background />;
};

export default Profile;

Profile.navigationOptions = {
  tabBarLabel: 'Meu perfil',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({color, size}) => (
    <Icon name="person" size={size} color={color} />
  ),
};
