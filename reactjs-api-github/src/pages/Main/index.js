import React from 'react';
import { FaGithubAlt, FaPlus } from 'icons-react/fa';

import { Container, Form, SubmitButton } from './styles';

export default function Main() {
  return (
    <Container>
      <h1>
        <FaGithubAlt />
        Repositório
      </h1>

      <Form onSubmit={() => {}}>
        <input type="text" alt="Adicionar repositório" />

        <SubmitButton disable>
          <FaPlus color="#fff" size={14} />
        </SubmitButton>
      </Form>
    </Container>
  );
}
