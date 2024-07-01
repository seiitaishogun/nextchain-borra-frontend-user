import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import Script from 'next/script';
import SajuResult from '@/components/Contents/Result/Type/Saju';
import JuyeogResult from '@/components/Contents/Result/Type/Juyeog';
import TarotResult from '@/components/Contents/Result/Type/Tarot';
import ZodiacResult from '@/components/Contents/Result/Type/Zodiac';
import JamidusuResult from '@/components/Contents/Result/Type/Jamidusu';
import Card from '@/components/Common/Card';
import Title from '@/components/Common/Title';
import TopBanner from '@/components/Contents/TopBanner';
import LoginButton from '@/components/Common/LoginButton';
import {
  ContentBox,
  RecommendContent,
  ShareBox,
} from '@/components/Contents/Result/Result.styled';
import ContentFeedback from '@/components/Contents/Feedback';
import { ContentsTypeE } from '@/types/content';
import useContentsLikes from '@/hooks/contents/useContentsLikes';
import useContentsShare from '@/hooks/share/useContentsShare';
import { loginState, userInfoState } from '@/store/auth';
import { fetchMainHotRandom } from '@/api/main';

interface Props {
  data: any;
  isLike: boolean;
  isShare: boolean;
}

function ContentsResult({ data, isLike, isShare }: Props) {
  const router = useRouter();
  const isLogin = useRecoilValue(loginState);
  const userInfo = useRecoilValue(userInfoState);
  const { content, purchase, parents, saju, myeongban } = data;

  const { handleShare, renderShare } = useContentsShare({
    purchaseId: purchase.id,
    content,
    userName: purchase.name,
  });
  const recommendContents = useQuery(
    ['contentsHotRandom'],
    fetchMainHotRandom,
    {
      initialData: {
        data: [],
      },
      select: res => res.data,
    }
  );
  const recommendContentsData = useContentsLikes({
    data: recommendContents.data,
    isLoading: recommendContents.isLoading,
  });

  const renderResult = () => {
    switch (content?.type.name) {
      case ContentsTypeE.Saju:
        return (
          <SajuResult
            user={purchase}
            data={parents}
            isLike={isLike}
            saju={saju}
          />
        );
      case ContentsTypeE.Juyeog:
        return <JuyeogResult data={parents} gwae={purchase.gwae} />;
      case ContentsTypeE.Tarot:
        return <TarotResult data={parents} purchase={purchase} />;
      case ContentsTypeE.Zodiac:
        return (
          <ZodiacResult
            user={purchase}
            data={parents}
            type={content.type.name}
            tabMessage="띠"
            isIcon
          />
        );
      case ContentsTypeE.Constellation:
        return (
          <ZodiacResult
            user={purchase}
            data={parents}
            type={content.type.name}
            tabMessage="별자리"
            isIcon={false}
          />
        );
      case ContentsTypeE.Jamidusu:
        return (
          <JamidusuResult
            user={purchase}
            data={parents}
            type={content.type.name}
            myeongban={myeongban}
          />
        );
      default:
        return (
          <SajuResult
            user={purchase}
            data={parents}
            isLike={isLike}
            saju={saju}
          />
        );
    }
  };

  const renderShareCase = () => {
    if (!isShare) {
      return (
        <>
          <p>결과는 어떠셨나요? 친구들과 공유해보세요</p>
          <button type="button" className="btn-share" onClick={handleShare}>
            공유하기
          </button>
          {renderShare()}
        </>
      );
    }

    if (isShare && !isLogin) {
      return <LoginButton />;
    }

    if (isShare && isLogin) {
      return (
        <button
          type="button"
          className="btn-share"
          onClick={() => router.push(`/contents/${content.id}`)}
        >
          {content.name} 보러가기
        </button>
      );
    }

    return null;
  };

  const renderMoreButton = () => {
    if (content?.type.name === ContentsTypeE.Saju && data.is_skip) {
      return (
        <button
          type="button"
          className="btn-flag"
          onClick={() => {
            router.push(`/contents/${router.query.id}?is_skip=0`);
          }}
        >
          다른 사주로 보기
        </button>
      );
    }

    return null;
  };

  const feedbackTitle = (() => (
    <>
      방금 보신 {'<'}
      {content.name}
      {'>'} 콘텐츠는 어떠셨나요?
      <br />
      {userInfo?.name || ''}님의 후기를 나누어주세요!
    </>
  ))();

  return (
    <>
      <section>
        <TopBanner bg={data.banner} />

        <ContentBox>
          {renderResult()}

          <ShareBox>
            {renderShareCase()}
            {renderMoreButton()}
          </ShareBox>
        </ContentBox>

        <ContentFeedback
          contentName={content.name}
          title={feedbackTitle}
          isFeedbackAction={!isShare}
        />

        <RecommendContent>
          <Title
            title="이런건 어떠세요?"
            className="title"
            linkConfig={{
              href: '/category/contents/hot',
              text: '다른 콘텐츠 더보기',
            }}
          />
          <Card
            size="small"
            data={recommendContentsData}
            isLoading={
              recommendContents.isLoading || recommendContents.isFetching
            }
            isSwipe
          />
        </RecommendContent>
      </section>

      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js"
        integrity="sha384-dpu02ieKC6NUeKFoGMOKz6102CLEWi9+5RQjWSV0ikYSFFd8M3Wp2reIcquJOemx"
        crossOrigin="anonymous"
      />
    </>
  );
}

export default ContentsResult;
