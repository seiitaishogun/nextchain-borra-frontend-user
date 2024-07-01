import styled from 'styled-components';
import {
  Info as CommonInfo,
  Card as CommonCard,
} from '@/components/Common/List/DetailList/DetailList.styled';

const Card = styled(CommonCard)`
  .card-link {
    height: 100px;
  }
`;

const Info = styled(CommonInfo)`
  padding-bottom: 0;
`;

export { Card, Info };
