import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira uma email válido')
    .required('O email é orbigatório'),
  password: Yup.string()
    .min(6, 'Mínimo 6 carcteres')
    .required('A senha é obrigatória'),
});

export default function SignUp() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <>
      <img src={logo} alt="GoBarber"/>

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Sua email" />
        <Input name="password" type="password" placeholder="Sua senha secreta"/>
        <button type="submit">Criar conta</button>

        <Link to="/">Já tenho login</Link>
      </Form>
    </>
  );
}
