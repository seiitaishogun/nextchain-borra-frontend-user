import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import Title from '@/components/Common/Title';
import Tag from '@/components/Common/Tag';
import { EmptyList } from '@/components/Common/Card/Card.styled';
import TitleCard from '@/components/Common/TitleCard';
import { authCheckState, userInfoState } from '@/store/auth';
import { fetchMainTags } from '@/api/main';

enum TagEnum {
  Marriage = 1,
  Love,
  Job,
  Study,
  Money,
  Health,
  Work,
  Children,
  RelationShip,
  Friend,
  Pet,
}

const Layout = styled.div`
  margin-top: 51px;
  padding: 0 ${props => props.theme.deviceMargin};

  > section {
    margin-top: 56px;
  }

  ${EmptyList} {
    margin-top: 0;
  }
`;

function TagContents() {
  const authCheck = useRecoilValue(authCheckState);
  const userInfo = useRecoilValue(userInfoState);
  const [selectedTag, setSelectedTag] = useState<Array<string>>([]);
  const { data, isLoading, isFetching } = useQuery(
    ['mainTags', selectedTag[0]],
    () => fetchMainTags(Number(selectedTag[0])),
    {
      enabled: selectedTag.length > 0,
      initialData: {
        data: [],
      },
      select: res => res.data,
    }
  );

  useEffect(() => {
    if (authCheck) {
      if (userInfo?.tags) {
        const newTags =
          userInfo?.tags?.length > 0
            ? userInfo.tags.map(t => t.toString())
            : ['1'];
        setSelectedTag(newTags);
      } else {
        setSelectedTag(['1', '2', '3']);
      }
    }
  }, [authCheck]);

  return (
    <Layout>
      <section>
        <Title title="지금 내 관심은..." />
        <Tag
          selectedTag={selectedTag}
          onClick={tagId => {
            setSelectedTag([tagId]);
          }}
        />
      </section>
      <section>
        <TitleCard
          style={{
            marginTop: 0,
            padding: 0,
          }}
          titleProps={{
            title: SECTION_TITLE[selectedTag[0] as unknown as TagEnum],
            linkConfig: {
              href: `/category/tags/${selectedTag[0]}/all`,
            },
          }}
          cardProps={{
            size: 'small',
            isLoading: isLoading || isFetching,
            data,
            useLike: false,
          }}
        />
      </section>
    </Layout>
  );
}

export default TagContents;

const SECTION_TITLE: Record<TagEnum, string> = {
  [TagEnum.Marriage]: '결혼하면 행복하다던데..⭐',
  [TagEnum.Love]: '꽁냥꽁냥, 지금은 연애 중!',
  [TagEnum.Job]: '이력서만 n번째, 진짜_최종.doc',
  [TagEnum.Study]: '세상에서 제일 쉬운게 공부라는데',
  [TagEnum.Money]: '유리지갑 지켜! 부자 되고싶다면?',
  [TagEnum.Health]: '잃기 전에 챙기자, 소중한 건강!',
  [TagEnum.Work]: '출근도 안했는데 퇴근하고 싶다',
  [TagEnum.Children]: '나는 좋은 부모일까요?',
  [TagEnum.RelationShip]: '연애보다 어려운 사회 생활',
  [TagEnum.Friend]: '우린 평생 갈 찐친일까?',
  [TagEnum.Pet]: '우리 멍냥이들은 무슨 생각일까?',
};
