import React from 'react';
import { Box, Button, Divider, IconButton, List, Toolbar } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Items from '@/components/Admin/Layout/Aside/Items';
import { Menu } from '@/components/Admin/Layout/Aside/Item';

interface Props {
  onClick: () => void;
}

function Aside({ onClick }: Props) {
  const isLiveServer = (process.env.APP_URL || '').includes('borra.today');
  return (
    <Box>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <IconButton onClick={onClick}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        <Items data={ITEMS} />
      </List>

      <Box
        sx={{
          position: 'absolute',
          left: '20px',
          bottom: '40px',
        }}
      >
        <Button
          type="button"
          variant="contained"
          sx={{
            mr: 1,
          }}
          color={isLiveServer ? 'error' : 'primary'}
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            window.location = 'https://borra.fles.dev/admin';
          }}
        >
          개발서버 전환
        </Button>
        <Button
          type="button"
          variant="contained"
          color={isLiveServer ? 'primary' : 'error'}
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            window.location = 'https://borra.today/admin';
          }}
        >
          실서버 전환
        </Button>
      </Box>
    </Box>
  );
}

export default Aside;

const ITEMS: Array<Menu> = [
  {
    id: 1,
    text: '회원관리',
    link: '/admin/users',
  },
  {
    id: 2,
    text: '결제관리',
    submenu: [
      {
        id: 1,
        text: '웹 코인 적립 내역',
        link: '/admin/payments/web',
      },
      {
        id: 2,
        text: '앱 코인 적립 내역',
        link: '/admin/payments/app',
      },
      {
        id: 3,
        text: '관리자 지급 내역',
        link: '/admin/payments/event',
      },
      {
        id: 4,
        text: '코인 사용 내역',
        link: '/admin/purchases',
      },
    ],
  },
  {
    id: 3,
    text: '콘텐츠관리',
    submenu: [
      {
        id: 1,
        text: '콘텐츠 조회/관리',
        link: '/admin/contents',
      },
      {
        id: 2,
        text: '신규 콘텐츠 생성',
        link: '/admin/contents/create',
      },
      {
        id: 2,
        text: '광고 제휴 콘텐츠 생성',
        link: '/admin/contents/create?site=advertise',
      },
      {
        id: 3,
        text: '테마 관리',
        link: '/admin/themes',
      },
    ],
  },
  {
    id: 4,
    text: '설문 데이터 관리',
    submenu: [
      {
        id: 1,
        text: '설문 데이터 조회',
        link: '/admin/survey',
      },
      {
        id: 2,
        text: '설문 데이터 등록',
        link: '/admin/survey/create',
      },
    ],
  },
  {
    id: 5,
    text: '운세 풀이 데이터 관리',
    submenu: [
      {
        id: 1,
        text: '운세 풀이 데이터 조회',
        link: '/admin/fortunes',
      },
      {
        id: 2,
        text: '운세 풀이 데이터 등록',
        link: '/admin/fortunes/create',
      },
    ],
  },
  {
    id: 6,
    text: '게시글 관리',
    submenu: [
      {
        id: 1,
        text: '게시글 조회',
        link: '/admin/posts',
      },
      {
        id: 2,
        text: '게시글 등록',
        link: '/admin/posts/create',
      },
    ],
  },
  {
    id: 7,
    text: '쿠폰 관리',
    submenu: [
      {
        id: 1,
        text: '쿠폰 조회',
        link: '/admin/coupons',
      },
      {
        id: 2,
        text: '쿠폰 등록',
        link: '/admin/coupons/create',
      },
    ],
  },
  {
    id: 8,
    text: '광고 제휴 관리',
    submenu: [
      {
        id: 1,
        text: '광고 제휴 조회',
        link: '/admin/advertises',
      },
      {
        id: 2,
        text: '광고 제휴 등록',
        link: '/admin/advertises/create',
      },
    ],
  },
  {
    id: 9,
    text: '배너 관리',
    submenu: [
      {
        id: 1,
        text: '배너 조회',
        link: '/admin/banners',
      },
      {
        id: 2,
        text: '배너 등록',
        link: '/admin/banners/create',
      },
    ],
  },
  {
    id: 10,
    text: '상담사 관리',
    link: '/admin/counselor',
  },
  {
    id: 11,
    text: '사이트 캐시 초기화',
    link: '/admin/renew',
  },
];
