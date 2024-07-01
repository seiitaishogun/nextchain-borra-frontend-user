import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Layout = styled.div`
  .tab {
    height: 58px;
    display: flex;

    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      width: 180px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      color: rgba(0, 0, 0, 0.32);
      font-size: 15px;
      font-weight: 500;
      letter-spacing: -0.2px;

      &.active {
        border-bottom: 2px solid #8986ff;
        color: #000;
      }
    }
  }
`;

function TabMenu() {
  const router = useRouter();
  const pathname = router.asPath || '/category/tags/1';

  return (
    <Layout>
      <ul className="tab">
        <li
          className={`item ${
            pathname.startsWith('/category/tags') && 'active'
          }`}
        >
          <Link href="/category/tags/1">주제별콘텐츠</Link>
        </li>
        <li
          className={`item ${pathname === '/category/themes/best' && 'active'}`}
        >
          <Link href="/category/themes/best">인기테마</Link>
        </li>
      </ul>
    </Layout>
  );
}

export default TabMenu;
