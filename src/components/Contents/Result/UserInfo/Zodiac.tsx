import React from 'react';

interface Props {
  date: string | null;
  value: any;
  menus: string[];
  tab: number;
}

function ZodiacUserInfo({ date, value, menus, tab }: Props) {
  return (
    <>
      <div>
        {date && <span>{date.split(' ', 1)[0].split('-')[0]}년생</span>}
      </div>
      <div>{value && <span>{menus[tab]}</span>}</div>
    </>
  );
}

export default ZodiacUserInfo;
