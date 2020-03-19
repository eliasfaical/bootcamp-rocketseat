import styled, { keyframes, css } from 'styled-components';

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

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #7159c1;
  margin-left: 10px;
  border-radius: 4px;
  padding: 10px 12px;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #333;

    & + li {
      border-top: 1px solid #eee;
    }

    a {
      color: #7159c1;
      text-decoration: none;
    }
  }
`;
