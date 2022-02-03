import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  margin-top: 20px;
  margin-bottom: 20px;
  height: 15%;
`;

export const ContentItem = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
  font-size: 14px;

  img {
    max-width: 100px;
  }

  :hover {
    opacity: 0.6;
  }
`;
