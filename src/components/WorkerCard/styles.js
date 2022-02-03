import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components';
import { customizations } from '../../configs/customizations';

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5px;
  padding: 10px;
  background-color: #f7f2f2;
  width: 200px;
  height: 250px;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;

  :hover {
    opacity: 0.9;
    background-color: ${customizations?.primaryColor};
    color: #fff;
    transform: scale(1.1);
  }

  span {
    font-size: 12px;
  }
`;

export const Name = styled.h1`
  font-size: 14px;
`;

export const StyledAvatar = styled(Avatar)`
  width: 80px;
  height: 80px;
  background-color: #d5d5d5;
  border-width: 3px;
  border-style: solid;
  margin-bottom: 10px;
  border-color: ${customizations?.primaryColor};
`;
