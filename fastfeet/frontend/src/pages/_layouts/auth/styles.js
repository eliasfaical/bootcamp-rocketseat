import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #7D40E7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 380px;
  text-align: left;
  background: #fff;
  padding: 3rem 2rem;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);

  img {
    max-width: 100%;
    height: auto;
    margin: 0 auto;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    label {
      display: block;
      font-size: .85rem;
      margin: 1rem 0 .5rem;
      text-transform: uppercase;
    }

    input {
      background: #fff;
      border: 1px solid #f1f1f1;
      border-radius: 4px;
      height: 45px;
      padding: 0 15px;
      color: #333;
      margin: 0 0 10px;
      font-size: 1rem;

      &::placeholder {
        font-size: .9rem;
        color: rgba(0,0,0,0.8);
      }
    }

    button {
      background: #7D40E7;
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
        background: ${darken(0.05, '#7D40E7')};
      }
    }
  }
`;
