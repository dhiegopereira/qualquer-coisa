import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import { Form } from 'react-bootstrap';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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
    margin: 0px 0px 0px 0px;
  }
`;

export const Name = styled.p`
  padding: 0px;
  margin: 0px 10px 0px 0px;

  @media (max-width: 800px) {
    margin: 0px;
    display: none;
  }
`;

export const StyledIconButton = styled(IconButton)`
  margin-right: 15px;
  padding: 0px;

  @media (max-width: 450px) {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px;
  }
`;

export const StyledForm = styled(Form)`
  @media (max-width: 450px) {
    width: 100%;
    margin: 0px;
  }
`;
