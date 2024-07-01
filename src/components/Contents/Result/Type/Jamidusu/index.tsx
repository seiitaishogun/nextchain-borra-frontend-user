import React from 'react';
import UserInfo from '@/components/Contents/Result/UserInfo';
import ContentsPage from '@/components/Contents/Result/Section/ContentsPage';
import { PaddingBox } from '@/components/Contents/Result/Result.styled';

interface Props {
  user: any;
  data: any;
  type: any;
  myeongban: any;
}

function JamidusuResult({ user, data, type, myeongban }: Props) {
  const partner = user?.partner;

  return (
    <PaddingBox>
      <UserInfo user={user} myeongbanInfo={myeongban || null} type={type} />

      {partner && (
        <UserInfo
          user={partner}
          myeongbanInfo={myeongban || null}
          type={type}
        />
      )}
      <ContentsPage data={data} />
    </PaddingBox>
  );
}

export default JamidusuResult;
