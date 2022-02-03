import styled from 'styled-components';
import { Container, Grid, FormControl, Badge, Button } from '@material-ui/core';

export const StyledContainer = styled.div`
  width: 100%;
`;

export const InternalContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  align-items: center;
  justify-content: center;
`;

export const SpaceBar = styled.div`
  height: 30px;

  @media (max-width: 450px) {
    height: 0px;
  }
`;

export const Body = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0px 12% 0px 12%;

  @media (max-width: 800px) {
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
    margin: 10px 0px;
    padding: 0px;
  }
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  width: 70%;
  overflow: auto;
  margin: 5px;
  border-radius: 4px;
  background-color: #f4f4f4;

  @media (max-width: 800px) {
    width: 100%;
    margin: 0px;
    justify-content: flex-start;
  }
`;

export const StyledGrid = styled(Grid)`
  display: flex;
  width: 80%;
  align-items: center;
  justify-content: center;

  @media (max-width: 800px) {
    width: 100%;
    margin: 0px;
    justify-content: flex-start;
  }
`;
export const StyledFormControl = styled(FormControl)`
  display: flex;
  border-width: 1px;
  border-color: rgba(198, 179, 179, 0.6);
  border-style: solid;
  margin: 10px;
  padding: 5px;
  border-radius: 4px;
`;

export const StyledImage = styled.img`
  width: 80px;
  height: 60px;
  border-radius: 5px;

  @media (max-width: 450px) {
    display: none;
  }
`;

export const StyledItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 12px;

  > p {
    color: #7a7171;
    margin: 0px;
    padding: 0px;
    font-size: 14px;

    @media (max-width: 450px) {
      font-size: 10px;
    }
  }
`;

export const StyledBadge = styled(Badge)`
  align-items: center;
  font-size: 18;
  color: #ec5252;
  font-weight: bold;
`;

export const Checkout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  margin: 5px 20px;
  padding: 10px;
  border-radius: 4px;
  background-color: #f4f4f4;

  @media (max-width: 800px) {
    width: 100%;
    margin: 0px 0px 10px 0px;
  }
`;

export const ContainerInformation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

export const StyledButton = styled(Button)`
  margin: 10px 0px 0px 10px;
  color: #fff;
`;

export const ContainerDescritption = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 10px 0px 0px 30px;
  }

  @media (max-width: 450px) {
    align-items: flex-start;
    justify-content: flex-start;
    margin: 0px 0px 0px 0px;
  }
`;

export const ContainerPrice = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10px 0px 0px 30px;
  }

  @media (max-width: 450px) {
    align-items: center;
    justify-content: center;
    margin: 0px 0px 0px 0px;
  }
`;
