import React from 'react';
import { useRouter } from 'next/router';
import { MenuItem, MenuLayout } from '@/components/Category/MenuList.styled';
import { CategoriesT, CategoryE } from '@/types/category';

interface Props {
  data?: Array<CategoriesT>;
}

function MenuList({ data }: Props) {
  const router = useRouter();

  return (
    <MenuLayout>
      {data?.map(({ id, name, icon }) => (
        <MenuItem
          key={id}
          src={icon}
          onClick={() => {
            if (id === CategoryE.Phone) {
              router.push(`/counselor`);
            } else {
              router.push(`/category/${id}`);
            }
          }}
        >
          <div className="wrapper">
            <span className="menu-icon" />
            <span>{name}</span>
          </div>
        </MenuItem>
      ))}
    </MenuLayout>
  );
}

export default MenuList;
