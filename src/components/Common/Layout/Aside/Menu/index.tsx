import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MenuList } from '@/components/Common/Layout/Aside/Aside.styled';

interface Props {
  menu: {
    text: string;
    src: string;
    link?: string;
    target?: string;
    isHide?: boolean;
    onClick?: () => void;
  }[];
  setIsOpen: React.Dispatch<boolean>;
}

function AsideMenu({ menu, setIsOpen }: Props) {
  return (
    <MenuList>
      {menu.map(({ text, src, link, target, isHide, onClick }) =>
        isHide ? null : (
          <li key={text}>
            <Link
              href={link || '/'}
              target={target || '_self'}
              onClick={event => {
                if (onClick) {
                  event.preventDefault();
                  onClick();
                } else {
                  setIsOpen(false);
                }
              }}
            >
              <div className="menu">
                <Image src={src} width={24} height={24} alt="" />
                <span>{text}</span>
              </div>
              <span className="arrow" />
            </Link>
          </li>
        )
      )}
    </MenuList>
  );
}

export default AsideMenu;
