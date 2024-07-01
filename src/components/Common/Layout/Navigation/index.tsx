import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Layout,
  Menu,
} from '@/components/Common/Layout/Navigation/Navigation.styled';

function Navigation() {
  const router = useRouter();
  const { pathname } = router;

  return (
    <Layout>
      <ul>
        {MENUS.map(({ text, link, on, off }) => {
          const isActive = link === pathname;
          return (
            <Menu
              key={link}
              className={isActive ? 'isActive' : ''}
              src={isActive ? on : off}
            >
              <Link href={link} passHref>
                <div className="icon" />
                <span className="text">{text}</span>
              </Link>
            </Menu>
          );
        })}
      </ul>
    </Layout>
  );
}

export default Navigation;

const MENUS = [
  {
    text: '홈',
    link: '/',
    on: `${process.env.APP_IMAGE_URL}/layout/navigation/home_on.svg`,
    off: `${process.env.APP_IMAGE_URL}/layout/navigation/home_off.svg`,
  },
  {
    text: '카테고리',
    link: '/category',
    on: `${process.env.APP_IMAGE_URL}/layout/navigation/category_on.svg`,
    off: `${process.env.APP_IMAGE_URL}/layout/navigation/category_off.svg`,
  },
  {
    text: '좋아요',
    link: '/accounts/likes',
    on: `${process.env.APP_IMAGE_URL}/layout/navigation/like_on.svg`,
    off: `${process.env.APP_IMAGE_URL}/layout/navigation/like_off.svg`,
  },
  {
    text: '마이페이지',
    link: '/accounts',
    on: `${process.env.APP_IMAGE_URL}/layout/navigation/account_on.svg`,
    off: `${process.env.APP_IMAGE_URL}/layout/navigation/account_off.svg`,
  },
];
