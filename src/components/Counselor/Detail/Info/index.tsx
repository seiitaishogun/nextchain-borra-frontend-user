import React from 'react';
import Title from '@/components/Common/Title';
import {
  ChildLayout,
  ContentLayout,
} from '@/components/Contents/Result/Result.styled';
import {
  Layout,
  Career,
  PhoneInfo,
} from '@/components/Counselor/Detail/Info/Info.styled';
import { COUNSELOR_FIRST_NUMBER } from '@/constants/counselor';
import { CounselorDetailT } from '@/types/counselor/detail';

interface Props {
  data: CounselorDetailT;
}

function CounselorInfo({ data }: Props) {
  return (
    <Layout>
      <Title title="상담사 소개" />
      <ContentLayout>
        <ChildLayout sign="1">
          <h4>전문분야</h4>
          <Career>{data.part}</Career>
        </ChildLayout>
        <ChildLayout sign="1">
          <h4>주요 경력 및 약력</h4>
          <Career dangerouslySetInnerHTML={{ __html: data.profile }} />
        </ChildLayout>
      </ContentLayout>
      <ContentLayout>
        <ChildLayout>
          <h4>상담사 연결하기</h4>
          <PhoneInfo>
            1. 지금 바로 연결하기 버튼 클릭
            <br />
            2. <strong>{COUNSELOR_FIRST_NUMBER}</strong>번 선택,{' '}
            <strong>{data.c_id}</strong>번을 누르면 연결
          </PhoneInfo>
        </ChildLayout>
      </ContentLayout>

      <ContentLayout>
        <h3>이용안내</h3>

        <ChildLayout>
          <h4>전화상담 이용요금</h4>
          <p>
            - 신점 상담: 30초당 1,500원 VAT 별도
            <br />
            - 역학/타로 상담: 30초당 1,300원 VAT 별도
            <br />
            - 5분 무료 상담: 5분 후부터 30초당 1,300원 VAT 별도
            <br />- 상담을 이용한 전화 요금에 합산되어 청구됩니다.
          </p>
        </ChildLayout>

        <ChildLayout>
          <h4>이용문의</h4>
          <p>
            - 고객센터 02-737-7365
            <br />- 평일 10:00~18:00, 토, 일 휴무
          </p>
        </ChildLayout>

        <ChildLayout>
          <h4>유의사항</h4>
          <p>
            - 전화상담은 연결 후 50초 동안은 상담료가 부과되지 않으며, 30초당
            1,500원의 상담료가 부과됩니다.
            <br />- 전화상담요금은 상담 받으신 전화의 해당 통신사로부터 청구되며
            상담요금 외에 부가세 10%는 별도입니다.
          </p>
        </ChildLayout>
      </ContentLayout>
    </Layout>
  );
}

export default CounselorInfo;
