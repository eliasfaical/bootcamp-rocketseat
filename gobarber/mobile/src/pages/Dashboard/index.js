import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';

// import { Container } from './styles';

const Dashboard = () => {
  return <Background />;
};

export default Dashboard;

Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({color, size}) => (
    <Icon name="event" size={size} color={color} />
  ),
};
