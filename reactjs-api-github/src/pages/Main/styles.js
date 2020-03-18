import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 2rem 1.5rem;
  border-radius: 4px;
  max-width: 800px;
  margin: 2rem auto;

  h1 {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 20px;

    svg {
      margin-right: 10px;
    }
  }
`;

export const Form = styled.form`
  margin-top: 1rem;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid #e1e1e1;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`;

export const SubmitButton = styled.button`
  background: #7159c1;
  margin-left: 10px;
  border-radius: 4px;
  padding: 10px 12px;
  cursor: pointer;
`;
