import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';
import Background from '~/components/Background';
import Appointment from '~/components/Appointment';

import {Container, Title, List} from './styles';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function loadAppointmes() {
      const response = await api.get('appointments');

      setAppointments(response.data);
    }

    loadAppointmes();
  }, []);

  async function handleCancel(id) {
    const response = await api.delete(`/appointments/${id}`);

    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id
          ? {...appointment, cancelled_at: response.data.cancelled_at}
          : appointment
      )
    );
  }

  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>

        <List
          data={appointments}
          keyExtractor={(item) => String(item.id)}
          renderItem={({item}) => (
            <Appointment onCancel={() => handleCancel(item.id)} data={item} />
          )}
        />
      </Container>
    </Background>
  );
};

export default Dashboard;

Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({color, size}) => (
    <Icon name="event" size={size} color={color} />
  ),
};
