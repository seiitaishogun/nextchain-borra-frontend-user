import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import SideMenu from '@/components/Common/Layout/Aside';
import {
  Item,
  Layout,
  Menu,
  Search as SearchItem,
  Wrap,
} from '@/components/Common/Layout/Header/Header.styled';

function Header() {
  const router = useRouter();
  const [clickedMenu, setClickedMenu] = useState(false);

  const handleMenu = () => {
    setClickedMenu(!clickedMenu);
  };

  const handleHome = () => {
    if (clickedMenu) {
      setClickedMenu(false);
    }
  };

  const handleLogin = () => {
    router.push('/login');
    setClickedMenu(false);
  };

  return (
    <>
      <Layout>
        <Wrap>
          <Item onClick={handleHome}>
            <Menu type="button" onClick={handleMenu}>
              <div className="icon" />
            </Menu>
          </Item>
          <Item className="logo" onClick={handleHome}>
            <Link href="/" passHref>
              <Image
                src="/icons/logo.png"
                width={80}
                height={80}
                alt="보라"
              />
            </Link>
          </Item>
          <Item>
            <SearchItem
              onClick={() => {
                router.push('/search');
              }}
            >
              <div className="icon" />
            </SearchItem>
          </Item>
        </Wrap>
      </Layout>
      <SideMenu
        isOpen={clickedMenu}
        setIsOpen={setClickedMenu}
        handleLogin={handleLogin}
      />
    </>
  );
}

export default Header;
