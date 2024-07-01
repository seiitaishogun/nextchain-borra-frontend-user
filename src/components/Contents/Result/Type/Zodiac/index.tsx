import React, { useState } from 'react';
import Tag from '@/components/Contents/Result/Type/Zodiac/Tag';
import ContentsPage from '@/components/Contents/Result/Section/ContentsPage';
import SwiperTabs from '@/components/Contents/Result/Type/Zodiac/SwiperTabs';
import { PaddingBox, TabBox } from '@/components/Contents/Result/Result.styled';
import UserInfo from '@/components/Contents/Result/UserInfo';
import { ContentsTypeE } from '@/types/content';

interface Props {
  user: any;
  data: Array<any>;
  type: ContentsTypeE;
  tabMessage?: string;
  isIcon?: boolean;
}

function ZodiacResult({ user, data, type, tabMessage, isIcon }: Props) {
  const [isSwiper, setIsSwiper] = useState(false);
  const [tabIndex, setTabIndex] = useState(user.value || null);
  const menus = data.map(p => p.name);

  const getIconImg = (num: number) =>
    isIcon
      ? `${process.env.APP_IMAGE_URL}/contents/${type}/${num}.svg`
      : null;

  return (
    <>
      {isSwiper && (
        <SwiperTabs
          tabs={menus}
          selectedTabIndex={tabIndex}
          handleClick={i => {
            setTabIndex(i % menus.length);
          }}
          getIconImg={getIconImg}
        />
      )}

      <PaddingBox>
        {!isSwiper && (
          <UserInfo
            user={user}
            data={data}
            sajuInfo={null}
            type={type}
            tab={tabIndex}
          />
        )}

        <ContentsPage
          data={data}
          selectedTabIndex={tabIndex}
          useParentName={false}
        />

        {!isSwiper && (
          <TabBox>
            <h4>다른 {tabMessage}도 보기</h4>

            <Tag
              tags={menus}
              selectedTabIndex={Number(tabIndex)}
              handleClick={i => {
                setIsSwiper(true);
                setTabIndex(i);
              }}
              getIconImg={getIconImg}
            />
          </TabBox>
        )}
      </PaddingBox>
    </>
  );
}

export default ZodiacResult;
