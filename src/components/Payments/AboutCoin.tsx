import styled from 'styled-components';

const Layout = styled.div`
  padding: 24px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.greyF7f9};
  font-size: 14px;
  line-height: 1.37;
  text-align: center;

  h2 {
    color: #8986ff;
    font-size: 18px;
    font-weight: 600;
  }

  p {
    margin-top: 16px;
  }

  span {
    color: ${({ theme }) => theme.colors.grey};
    font-size: 12px;
  }
`;

function AboutCoin() {
  return (
    <Layout>
      <h2>보라 코인이란?</h2>
      <p>
        보라에서 서비스 중인 유료 서비스를
        <br />
        이용할 수 있는 사이버 머니입니다.
      </p>
      <span>* 보라 1코인 = 100원</span>
    </Layout>
  );
}

export default AboutCoin;
