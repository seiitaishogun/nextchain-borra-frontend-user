import styled from 'styled-components';

const Layout = styled.div`
  width: 320px;
  height: auto;
  padding: 27px 32px 51px;
  border-radius: 40px;
  box-sizing: border-box;
  background: #ffffff;
`;

const ShareTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  line-height: 29px;
  font-family: ${({ theme }) => theme.fontFamilies.notoSans};
  color: #000000;
  text-align: center;
`;

const ShareSocialItem = styled.button<{ image: string }>`
  overflow: hidden;
  width: 53px;
  height: 53px;
  border-radius: 50%;
  background: url(${({ image }) => image}) no-repeat center center;
  background-size: cover;
  text-indent: -9999px;
  cursor: pointer;
`;

const ShareSocial = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 37px;
  padding: 0 20px;

  ${ShareSocialItem}, button {
    margin: 0 21px;
  }
`;

export { Layout, ShareTitle, ShareSocial, ShareSocialItem };
