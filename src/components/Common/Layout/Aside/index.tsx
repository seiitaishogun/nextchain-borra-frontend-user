import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Drawer } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { useMutation } from '@tanstack/react-query';
import {
  BottomButton,
  BottomButtonBox,
  Close,
  Layout,
  User,
  Welcome,
} from '@/components/Common/Layout/Aside/Aside.styled';
import AccountsButton from '@/components/Accounts/Button';
import AsideMenu from '@/components/Common/Layout/Aside/Menu';
import { DetailBox } from '@/styles/Accounts/UserInfo.styled';
import { loginState, userInfoState } from '@/store/auth';
import { formatBirthedAt } from '@/utils/date';
import { CALENDAR_TEXT } from '@/constants/users';
import { CalendarE } from '@/types/users';
import useAlert from '@/hooks/common/useAlert';
import { logout } from '@/api/auth';
import useAppCheck from '@/hooks/app/useAppCheck';
import useAppReviewRegister from '@/hooks/app/useAppReviewRegister';
import { checkPlatform } from '@/utils/agent';
import useAppCsChat from '@/hooks/app/useAppCsChat';

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<boolean>;
  handleLogin: () => void;
}

function Menu({ isOpen, setIsOpen, handleLogin }: Props) {
  const router = useRouter();
  const isLogin = useRecoilValue(loginState);
  const user = useRecoilValue(userInfoState);
  const { isApp } = useAppCheck();
  const { appReviewRegister } = useAppReviewRegister();
  const { appCsChat } = useAppCsChat();

  const { renderMessage, setAlertOptions, handleReset } = useAlert();
  const logoutMutation = useMutation(logout, {
    onSuccess: () => {
      setAlertOptions({
        isOpen: true,
        description: '로그아웃 되었습니다.',
        handleConfirm: () => {
          window.location.href = '/';
        },
      });
    },
    onError: () => {
      setAlertOptions({
        isOpen: true,
        description: '오류가 발생했습니다. 다시 시도해주세요.',
        handleConfirm: handleReset,
      });
    },
  });

  const [date, time] = formatBirthedAt(user?.birthed_at || null);
  const calendar = user?.calendar
    ? CALENDAR_TEXT[user.calendar as CalendarE]
    : null;

  const handleLogout = () => {
    if (logoutMutation.isLoading) return;
    logoutMutation.mutate();
  };

  const menu = [
    {
      src: '/layout/aside/wallet.svg',
      text: '나의 코인',
      link: '/payments/charge',
    },
    {
      src: '/layout/aside/bullhorn.svg',
      text: '공지사항',
      link: '/posts',
    },
    {
      src: '/layout/aside/account.svg',
      text: 'FAQ',
      link: '/faqs',
      target: '_self',
    },
    {
      src: '/layout/aside/kakao.svg',
      text: '카카오톡 문의하기',
      onClick: () => {
        const isAos = checkPlatform() === 'aos';
        if (isAos) {
          appCsChat();
        } else {
          window.open('http://pf.kakao.com/_ymuIC/chat', '_blank');
        }
        setIsOpen(false);
      },
    },
    {
      src: '/layout/aside/review.webp',
      text: '리뷰 쓰러가기',
      isHide: !isApp,
      onClick: () => {
        setIsOpen(false);
        appReviewRegister();
      },
    },
  ];

  return (
    <>
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        variant="temporary"
        transitionDuration={0}
        sx={{
          '& .MuiDrawer-root': {
            position: 'absolute',
          },
          '& .MuiPaper-root': {
            position: 'absolute',
            left: '50%',
            marginLeft: '-180px',
          },
        }}
      >
        <Layout>
          <div>
            <Close onClick={() => setIsOpen(false)} />
            {user && (
              <Welcome>
                <div className="account">
                  <div className="message">
                    {user.name && (
                      <>
                        <span className="name">{user.name}</span>님,
                        <br />
                      </>
                    )}
                    환영합니다.
                    <DetailBox>
                      {typeof user?.gender === 'number' && (
                        <div>{user.gender ? '여자' : '남자'}</div>
                      )}
                      <div>
                        {date && <span>{date}</span>}
                        {calendar && <span>{calendar}</span>}
                        {time && <span>{time}</span>}
                      </div>
                    </DetailBox>
                  </div>
                  <AccountsButton
                    onClick={() => {
                      setIsOpen(false);
                      router.push('/accounts/edit');
                    }}
                  />
                </div>
              </Welcome>
            )}

            {!user && (
              <User>
                <button type="button" className="login" onClick={handleLogin}>
                  <div className="text">로그인하기</div>
                  <span className="arrow" />
                </button>
                <div className="message">
                  <Image
                    style={{
                      marginTop: '-2px',
                    }}
                    src="/layout/aside/bulb.png"
                    width={16}
                    height={16}
                    alt=""
                  />
                  <span className="text">로그인하여 나의 운세 알아보기</span>
                </div>
              </User>
            )}

            <AsideMenu menu={menu} setIsOpen={setIsOpen} />
          </div>

          <BottomButtonBox>
            {isLogin && (
              <BottomButton
                type="button"
                data-testid="logout"
                onClick={handleLogout}
              >
                로그아웃
              </BottomButton>
            )}
          </BottomButtonBox>
        </Layout>
      </Drawer>

      {renderMessage()}
    </>
  );
}

export default Menu;
