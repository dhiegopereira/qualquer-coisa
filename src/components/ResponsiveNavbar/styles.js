import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 9px;
  margin: 0px;
  color: #fff;

  @media (max-width: 1000px) {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 10px 0px 0px 30px;
  }

  @media (max-width: 600px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px 0px 0px 30px;
  }
`;

export const IconContainerButton = styled.div`
  @media (max-width: 800px) {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px 0px 0px 30px;
  }

  @media (max-width: 450px) {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px 0px 0px 30px;
  }
`;

export const StyledLink = styled(Link)`
  margin-left: 10px;
  margin-right: 10px;
  text-decoration: none;

  @media (max-width: 450px) {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 0px 0px 0px;
  }
`;
