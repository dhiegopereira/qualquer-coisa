import { Container, Grid } from '@material-ui/core';
import styled from 'styled-components';
import { customizations } from '../../configs/customizations';

export const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const StyledHr = styled.hr`
  width: 100%;
  border-top: 1px solid ${customizations?.primaryColor} 0.3;
`;

export const Body = styled(Grid)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px !important;
  margin-top: 20px !important;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export const BodyContainer = styled(Container)`
  @media (max-width: 800px) {
    margin-top: 80px;
  }
`;
