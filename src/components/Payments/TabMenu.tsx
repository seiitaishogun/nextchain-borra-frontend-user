import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';

const Layout = styled.ul`
  height: 58px;
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);

  li {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 0 14px;
    color: rgba(0, 0, 0, 0.32);
    font-size: 15px;
    font-weight: 500;
    letter-spacing: -0.2px;

    &.active {
      border-bottom: 2px solid #8986ff;
      color: #000;
    }

    a:active,
    a:hover {
      color: #000;
    }
  }
`;

function TabMenu() {
  const router = useRouter();
  const { pathname } = router;

  const checkPathName = (path: string) => pathname === path;

  return (
    <Layout>
      <li
        className={classNames({
          active: checkPathName('/payments/charge'),
        })}
      >
        <Link href="/payments/charge">코인 충전</Link>
      </li>
      <li
        className={classNames({
          active: checkPathName('/payments'),
        })}
      >
        <Link href="/payments">충전 내역</Link>
      </li>
      <li
        className={classNames({
          active: checkPathName('/payments/purchases'),
        })}
      >
        <Link href="/payments/purchases">사용 내역</Link>
      </li>
    </Layout>
  );
}

export default TabMenu;
