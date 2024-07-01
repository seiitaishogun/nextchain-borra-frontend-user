import React, { useMemo, useState } from 'react';
import DetailInfo, {
  SajuT,
} from '@/components/Contents/Result/Type/Saju/DetailInfo';
import Popup from '@/components/Common/Popup';
import MyeongbanDetailInfo from '@/components/Contents/Result/Type/Jamidusu/DetailInfo';
import { FlexSpaceBetween } from '@/components/Contents/Result/UserInfo/UserInfo.styled';
import DefaultUserInfo from '@/components/Contents/Result/UserInfo/Default';
import JamidusuUserInfo from '@/components/Contents/Result/UserInfo/Jamidusu';
import ZodiacUserInfo from '@/components/Contents/Result/UserInfo/Zodiac';
import ConstellationUserInfo from '@/components/Contents/Result/UserInfo/Constellation';
import {
  DetailBox,
  Favorite,
  Layout,
  TopBox,
} from '@/styles/Accounts/UserInfo.styled';
import { CALENDAR_TEXT } from '@/constants/users';
import { CalendarE } from '@/types/users';
import { formatBirthedAt } from '@/utils/date';
import { ContentsTypeE } from '@/types/content';
import { MyeongbanT } from '@/api/content';

interface Props {
  user: any;
  isLike?: boolean;
  sajuInfo?: SajuT | null;
  myeongbanInfo?: MyeongbanT | null;
  type?: ContentsTypeE;
  tab?: number;
  data?: Array<any>;
}

function UserInfo({
  user,
  isLike,
  sajuInfo,
  myeongbanInfo,
  type,
  tab,
  data,
}: Props) {
  const [isPopup, setIsPopup] = useState(false);
  const [date, time] = formatBirthedAt(user?.birthed_at);
  const calendar = user?.calendar
    ? CALENDAR_TEXT[user.calendar as CalendarE]
    : null;
  const menus = data?.map(p => p.name) || [];

  const handleSajuInfo = () => {
    setIsPopup(true);
  };

  const handleClose = () => {
    setIsPopup(false);
  };

  const renderUserInfo = useMemo(() => {
    switch (type) {
      case ContentsTypeE.Jamidusu:
        return (
          <JamidusuUserInfo
            date={date}
            calendar={calendar}
            time={time}
            handleSajuInfo={handleSajuInfo}
          />
        );
      case ContentsTypeE.Zodiac:
        return (
          <ZodiacUserInfo
            date={date}
            value={user.value}
            menus={menus}
            tab={tab as number}
          />
        );
      case ContentsTypeE.Constellation:
        return (
          <ConstellationUserInfo
            date={date}
            value={user.value}
            menus={menus}
            tab={tab as number}
          />
        );
      default:
        return (
          <DefaultUserInfo
            date={date}
            calendar={calendar}
            time={time}
            handleSajuInfo={handleSajuInfo}
          />
        );
    }
  }, [data, user]);

  return (
    <>
      <Layout>
        <TopBox>
          {user?.name && <h3>{user.name}</h3>}
          {isLike !== undefined && (
            <Favorite is_favorite={isLike}>좋아요</Favorite>
          )}
        </TopBox>
        <FlexSpaceBetween>
          <DetailBox>
            {typeof user?.gender === 'number' && (
              <div>{user.gender ? '여자' : '남자'}</div>
            )}

            {renderUserInfo}
          </DetailBox>
        </FlexSpaceBetween>
      </Layout>

      <Popup isOpen={isPopup && (!!sajuInfo || !!myeongbanInfo)}>
        {sajuInfo && (
          <DetailInfo
            data={sajuInfo}
            name={user.name}
            handleClose={handleClose}
          />
        )}
        {myeongbanInfo && (
          <MyeongbanDetailInfo
            data={myeongbanInfo}
            user={user}
            handleClose={handleClose}
          />
        )}
      </Popup>
    </>
  );
}

export default UserInfo;
