import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '@/store/auth';
import { numberWithCommas } from '@/utils/number';

const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 25px 0;
  margin-top: 16px;
  border-radius: 8px;
  background: #8986ff;
  font-size: 14px;
  text-align: center;

  p {
    display: flex;
    color: #fff;

    .coin {
      display: flex;
      align-items: center;
      margin: 0 4px;
      color: #ffe055;

      .icon {
        margin-right: 2px;
        width: 14px;
        height: 14px;
        background: url('${props => `${props.theme.imageUrl}/common/coin.svg`}')
          no-repeat center;
        background-size: contain;
      }
    }
  }
`;

function MyCoin() {
  const user = useRecoilValue(userInfoState);

  return (
    <Layout>
      <p>
        현재 보라 코인 잔액은
        <span className="coin">
          <span className="icon" />
          {numberWithCommas(user?.coin || 0)}
        </span>
        입니다.
      </p>
    </Layout>
  );
}

export default MyCoin;
