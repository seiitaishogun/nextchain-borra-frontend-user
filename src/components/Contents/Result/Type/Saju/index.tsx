import React from 'react';
import UserInfo from '@/components/Contents/Result/UserInfo';
import ContentsPage from '@/components/Contents/Result/Section/ContentsPage';
import { PaddingBox } from '@/components/Contents/Result/Result.styled';

interface Props {
  user: any;
  data: any;
  isLike: boolean;
  saju: any;
}

function SajuResult({ user, data, isLike, saju }: Props) {
  const partner = user?.partner;

  return (
    <PaddingBox>
      <UserInfo user={user} isLike={isLike} sajuInfo={saju[0] || null} />

      {partner && <UserInfo user={partner} sajuInfo={saju[1] || null} />}
      <ContentsPage data={data} />
    </PaddingBox>
  );
}

export default SajuResult;
