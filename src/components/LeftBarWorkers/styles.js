import { Button, Container } from '@material-ui/core';
import styled from 'styled-components';
import { customizations } from '../../configs/customizations';

export const StyledHr = styled.hr`
  width: 100%;
  border-top: 1px solid #45c 0.3;
`;

export const LeftBar = styled(Container)`
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  height: 100vh !important;
  align-items: center;
  justify-content: flex-start;
  width: 28% !important;
  background-color: #f7f2f2;

  span {
    margin-bottom: 12px;
  }

  h5 {
    text-align: center;
  }
  p {
    color: #b2adad;
  }

  ul {
    width: 100%;
    list-style: none;
    padding: 0px;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  @media (max-width: 800px) {
    width: 100% !important;
    height: 50vh !important;
  }
`;

export const ContentTypes = styled.div`
  display: flex;
  flex-direction: row;
  span {
    font-size: 10px;
    margin: 0;
    padding: 0;
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  padding-bottom: 10px;
`;

export const StyledButton = styled(Button)`
  color: #fff;
  background-color: ${customizations?.primaryColor};
  text-align: center;
`;
