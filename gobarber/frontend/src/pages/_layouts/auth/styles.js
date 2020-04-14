import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(-90deg, #7159c1, #ab59c1);
  display: flex;
  flex-direction: center;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: rgba(0,0,0,0.1);
      border: 0;
      border-radius: 4px;
      height: 45px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;
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
`;
