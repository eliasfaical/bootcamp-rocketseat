import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { signOut } from '~/store/module/auth/actions';
import { updateProfileRequest } from '~/store/module/user/actions';

import AvatarInput from './AvatarInput';

import { Container } from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <AvatarInput name="avatar_id" />

        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu endere de email" />
        <hr/>
        <Input type="password" name="oldPassword" placeholder="Sua senha atual" />
        <Input type="password" name="password" placeholder="Nova senha" />
        <Input type="password" name="confirmPassword" placeholder="Confirmaã de senha" />
        <button type="submit">Atualizar perfil</button>
      </Form>
      <button onClick={handleSignOut} type="button">Sair do GoBarber</button>
    </Container>
  );
}
