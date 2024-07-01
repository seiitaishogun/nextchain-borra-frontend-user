import React from 'react';
import { SajuInfoButton } from '@/components/Contents/Result/UserInfo/UserInfo.styled';

interface Props {
  date: string | null;
  calendar: string | null;
  time: string | null;
  handleSajuInfo: () => void;
}

function DefaultUserInfo({ date, calendar, time, handleSajuInfo }: Props) {
  return (
    <>
      <div>
        {date && <span>{date}</span>}
        {calendar && <span>{calendar}</span>}
        {time && <span>{time}</span>}
      </div>
      <SajuInfoButton type="button" onClick={handleSajuInfo}>
        사주분석 보기
      </SajuInfoButton>
    </>
  );
}

export default DefaultUserInfo;
