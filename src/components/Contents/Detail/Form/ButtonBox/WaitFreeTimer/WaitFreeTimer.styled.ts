import styled from 'styled-components';
import { Clock } from '@/components/Common/PriceBox/PriceBox.styled';

const Layout = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: fit-content;

  ${Clock} {
    text-align: left;
  }

  span {
    margin: 1px 0 0 0 !important;
    font-size: 13px;
    font-weight: bold;
    line-height: 15px;
  }
`;

export { Layout };
