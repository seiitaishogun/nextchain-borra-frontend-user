import styled from 'styled-components';

const Layout = styled.div`
  padding: 0 20px;

  button {
    margin: 0 auto;
    display: flex;
  }
`;

const CoinBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 50px 0;
  padding: 25px;
  min-height: 130px;
  border-radius: 20px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.greyF7f9};
`;

const CoinBoxItem = styled.div`
  width: 50%;

  span {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.grey};
  }

  div {
    display: flex;
    align-items: center;
    margin-top: 20px;
    font-size: ${({ theme }) => theme.fontSizes.lg_xx};
  }

  strong {
    padding: 0 10px;
  }

  &.user {
    strong {
      color: ${({ theme }) => theme.colors.grey};
    }
  }

  &.product {
    strong {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export { Layout, CoinBox, CoinBoxItem };
