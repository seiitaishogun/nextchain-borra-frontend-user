import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import Advertise from '@/components/Common/Advertise';
import Popup from '@/components/Common/Popup';
import { ContentsTypeE } from '@/types/content';
import { CONTENT_AD } from '@/constants/adsense';
import { isAdvertiseAtom } from '@/store/content/step';
import { contentFormSelector } from '@/store/content/form';

interface Props {
  contentId: number;
  type: {
    id: number;
    name: ContentsTypeE;
    description: string;
    is_skip: boolean;
  };
}

const Layout = styled.article`
  overflow-y: auto;
  width: 360px;
  height: 100vh;
  padding: 0 20px 40px;
  box-sizing: border-box;
  background: linear-gradient(180deg, #dedbff 0%, rgba(241, 240, 254, 0) 130px)
    #ffffff;
`;

const Logo = styled.div`
  width: 180px;
  height: 80px;
  margin: 90px auto 0;
  background: url('${process.env
      .APP_IMAGE_URL}/contents/free/middle_logo.png')
    no-repeat center center;
  background-size: cover;
`;

const Message = styled.p`
  height: 52px;
  margin-top: 40px;
  font-size: 18px;
  line-height: 28px;
  text-align: center;
  color: ${props => props.theme.colors.primaryLight};
`;

const Button = styled.button`
  width: 100%;
  height: 52px;
  margin-top: 40px;
  border-radius: 10px;
  background: ${props => props.theme.colors.primaryDark};
  font-size: 15px;
  font-weight: 600;
  line-height: 52px;
  text-align: center;
  color: #ffffff;
`;

function ContentAdvertise({ contentId, type }: Props) {
  const [isAdvertise, setIsAdvertise] = useRecoilState(isAdvertiseAtom);
  const [isLoading, setIsLoading] = useState(true);
  const contentForm = useRecoilValue(contentFormSelector(contentId));

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    return () => {
      setIsLoading(true);
    };
  }, []);

  const getMessage = useCallback(() => {
    const userName = contentForm?.user?.name || '';
    if (type.name === ContentsTypeE.Tarot) {
      return `${userName}님의 ${type.description} 카드를 리딩 중...`;
    }
    return `${userName}님의 ${type.description} 분석하는 중...`;
  }, [type]);

  return (
    <Popup isOpen={isAdvertise}>
      <Layout>
        <Logo />

        <Advertise
          style={{
            marginTop: '40px',
          }}
          {...CONTENT_AD}
        />

        {isLoading && <Message>{getMessage()}</Message>}

        {!isLoading && (
          <Button type="button" onClick={() => setIsAdvertise(false)}>
            결과 확인하기
          </Button>
        )}
      </Layout>
    </Popup>
  );
}

export default ContentAdvertise;
