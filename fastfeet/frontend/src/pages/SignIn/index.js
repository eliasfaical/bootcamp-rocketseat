import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/images/logo.svg';

export default function SignIn() {
  const schema = Yup.object().shape({
    email: Yup.string().email('Insira seu email').required('O email é obrigatótio'),
    password: Yup.string('Insira sua senha').required('Senha obrigatória'),
  });

  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <>
      <img src={logo} alt="FastFeet"/>

      <Form schema={schema} onSubmit={handleSubmit}>
        <label htmlFor="email">Seu email</label>
        <Input type="email" name="email" placeholder="email@email.com"/>
        <label htmlFor="email">Seu email</label>
        <Input type="password" name="password" placeholder="**********"/>
        <button type="submit">Entrar no sistema</button>
      </Form>
    </>
  );
}
