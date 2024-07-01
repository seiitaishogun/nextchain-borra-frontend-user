import React from 'react';

interface Props {
  date: string | null;
  value: any;
  menus: string[];
  tab: number;
}

function ConstellationUserInfo({ date, value, menus, tab }: Props) {
  return (
    <>
      <div>{date && <span>{date}</span>}</div>
      <div>{value && <span>{menus[tab]}</span>}</div>
    </>
  );
}

export default ConstellationUserInfo;
