import styled from 'styled-components';
import {
  ContentLayout,
  ChildLayout,
} from '@/components/Contents/Result/Result.styled';

const Layout = styled.section`
  margin-top: 40px;
  padding-bottom: 20px;

  ${ContentLayout} {
    h3 {
      font-size: 17px;
      line-height: 19px;
    }

    h3 + ${ChildLayout} {
      margin-top: 15px;
    }
  }

  ${ChildLayout} {
    margin-top: 20px;
    padding-bottom: 0;
    border-bottom: 0;

    &:first-child {
      margin-top: 0;
    }

    h4 + p {
      margin-top: 5px;
    }
  }
`;

const Career = styled.p`
  margin-top: 15px;
  padding-left: 24px;
  white-space: pre-wrap;
`;

const PhoneInfo = styled.p`
  margin-top: 15px !important;

  strong {
    color: ${props => props.theme.colors.primary};
  }
`;

export { Layout, Career, PhoneInfo };
