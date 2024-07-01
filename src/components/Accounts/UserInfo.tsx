import React from 'react';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import AccountsButton from '@/components/Accounts/Button';
import { DetailBox, Layout, TopBox } from '@/styles/Accounts/UserInfo.styled';
import { CalendarE } from '@/types/users';
import { CALENDAR_TEXT } from '@/constants/users';
import { formatBirthedAt } from '@/utils/date';
import { userInfoState } from '@/store/auth';

interface Props {
  isAccountButton?: boolean;
}

function UserInfo({ isAccountButton }: Props) {
  const router = useRouter();
  const userInfo = useRecoilValue(userInfoState);
  const [date, time] = formatBirthedAt(userInfo?.birthed_at || null);
  const calendar = userInfo?.calendar
    ? CALENDAR_TEXT[userInfo.calendar as CalendarE]
    : null;
  return (
    <Layout>
      <TopBox>{userInfo?.name && <h3>{userInfo.name}</h3>}</TopBox>
      <DetailBox>
        {typeof userInfo?.gender === 'number' && (
          <div>{userInfo.gender ? '여자' : '남자'}</div>
        )}
        <div>
          {date && <span>{date}</span>}
          {calendar && <span>{calendar}</span>}
          {time && <span>{time}</span>}
        </div>
      </DetailBox>
      {isAccountButton && (
        <AccountsButton
          onClick={() => {
            router.push('/accounts/edit');
          }}
        />
      )}
    </Layout>
  );
}

export default UserInfo;
