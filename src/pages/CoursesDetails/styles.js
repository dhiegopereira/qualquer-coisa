import styled from 'styled-components';
import Background from '../../assets/background-default.jpg';
import Button from '@material-ui/core/Button';
import { customizations } from '../../configs/customizations';
import TableContainer from '@material-ui/core/TableContainer';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-image: url(${Background});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  min-height: 300px;
  color: #fff;

  img {
    width: 250px;
    height: 150px;
    border-radius: 5px;
  }

  @media (max-width: 500px) {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;

    img {
      width: 100%;
      height: auto;
      border-radius: 0px;
      margin-bottom: 0px;
    }
  }
`;

export const LeftHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0px 20px 50px;
  width: 60%;

  span {
    margin: 10px 0px 10px 0px;
  }
  @media (max-width: 500px) {
    width: 100%;
    text-align: center;
    justify-content: center;
    align-items: center;
    padding: 0px;
  }
`;
export const RightHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 10px;
  width: 40%;

  @media (max-width: 500px) {
    width: 100%;
    text-align: center;
  }
`;

export const StyledButton = styled(Button)`
  background-color: ${customizations?.primaryColor}!important;
  margin-top: 20px !important;
  width: 250px !important;

  @media (max-width: 500px) {
    width: 100% !important;
  }
`;

export const StyledTable = styled(TableContainer)`
  padding: 20px;
  width: 75% !important;

  @media (max-width: 500px) {
    width: 100% !important;
  }
`;
