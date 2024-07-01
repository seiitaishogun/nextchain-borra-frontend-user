import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import SajuForm from '@/components/Contents/Detail/Form/Saju/Form';
import {
  ChildLayout,
  ContentLayout,
} from '@/components/Contents/Result/Result.styled';
import Title from '@/components/Common/Title';
import NormalDescription from '@/components/Contents/Result/Template/Description/Normal';
import { fetchContentsPreview } from '@/api/content';
import useResetForm from '@/hooks/contents/useResetForm';

interface Props {
  isPartner: boolean;
  type?: string;
}

const ContentsPreview = styled.div`
  margin-top: 20px;

  ${ContentLayout} {
    margin-top: 15px;

    ${ChildLayout} {
      margin-top: 15px;
      padding-bottom: 15px;

      &:first-child {
        margin-top: 0;
      }

      &:last-child {
        padding-bottom: 0;
      }

      h4 {
        font-weight: 500;
      }
    }
  }
`;

function SajuFormContainer({ isPartner, type }: Props) {
  const router = useRouter();
  const id = Number(router.query?.id || 0);
  const {
    handleOpenUserConfirm,
    handleOpenPartnerConfirm,
    renderResetConfirm,
  } = useResetForm();
  const { data: previewData } = useQuery(
    ['contentsPreview', id],
    () => fetchContentsPreview(id),
    {
      enabled: router.isReady,
      initialData: [],
      select: res => res.filter((r: any) => r.name !== 'null'),
    }
  );

  return (
    <>
      <SajuForm
        isUser
        title="나의 사주 입력하기"
        linkConfig={{
          text: '다른 사주 입력하기',
          onClick: handleOpenUserConfirm,
        }}
      />

      {isPartner && (
        <SajuForm
          isUser={false}
          title="상대방 사주 입력하기"
          linkConfig={{
            text: '다른 사주 입력하기',
            onClick: handleOpenPartnerConfirm,
          }}
        />
      )}

      {type === 'jamidusu' && (
        <NormalDescription
          name="자미두수란"
          contents="자미(紫微)라는 말은 하늘의 중심에 자리한 천문상의 구역을 말하며 북극성의 다른 이름이에요.<br/><br/> 예로부터 동양에서는 하늘과 사람은 서로 깊은 연관 관계를 가진다고 생각했어요. 하늘이 사람에게 길흉화복을 가져다 주는 지침이 되고, 인간은 그 하늘에 있는 별을 보고 자신의 운명을 알 수 있는 것이죠.<br/><br/> 이런 하늘의 변화를 독특한 14개의 주성(별)의 모임과 흩어짐을 통해서 운명의 길흉화복을 알아볼 수 있는 것을 자미두수(紫微斗數)라고 해요.<br/><br/> 자미두수는 별들의 움직임으로 한 사람이 가지고 있는 깊은 내면과 현생에서 이루어지는 가족관계까지, 인생에 대한 전반적인 정보를 깊숙하게 알아볼 수 있어요."
        />
      )}

      <ContentsPreview>
        <Title title="이런 내용이 있어요 !" />
        <ContentLayout>
          {previewData.map(({ id: cId, name, sign }: any) => (
            <ChildLayout key={cId} sign={sign}>
              <h4 dangerouslySetInnerHTML={{ __html: name }} />
            </ChildLayout>
          ))}
        </ContentLayout>
      </ContentsPreview>

      {renderResetConfirm()}
    </>
  );
}

export default SajuFormContainer;
