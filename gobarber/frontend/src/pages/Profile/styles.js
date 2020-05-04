import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 900px;
  margin: 50px auto;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    
    hr {
      border: 0;
      height: 1px;
      width: 100%;
      margin-bottom: 20px;
      background: rgba(255,255,255,0.5);
    }

    input {
      background: rgba(0,0,0,0.1);
      border: 0;
      border-radius: 4px;
      height: 45px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 15px;
      font-size: 1rem;

      &::placeholder {
        color: rgba(255,255,255,0.7);
      }
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 15px;
      display: block;
    }

    button {
      background: #3b93ff;
      border: 0;
      border-radius: 4px;
      height: 45px;
      padding: 0 15px;
      color: #fff;
      margin: 5px 0 0;
      font-size: 1rem;
      text-transform: uppercase;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#3b93ff')};
      }
    }

    a {
      color: #fff;
      font-size: 1rem;
      margin-top: 15px;
      display: block;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }

  > button {
      width: 100%;
      background: #fb6f91;
      border: 0;
      border-radius: 4px;
      height: 45px;
      padding: 0 15px;
      color: #fff;
      margin: 10px 0 0;
      font-size: 1rem;
      text-transform: uppercase;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.07, '#fb6f91')};
      }
    }
`;
