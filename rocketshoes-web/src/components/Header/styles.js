import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0 1.5rem;
`;

export const Cart = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }

  div {
    text-align: right;
    margin-right: 10px;
  }

  strong {
    display: block;
    margin-top: 1.5rem;
  }

  span {
    font-size: 0.9rem;
    color: #999;
  }
`;
