import { CounselorStateT } from '@/types/counselor';

const getStateStatus = (state: CounselorStateT) => state === 2;

const getListStateText = (status: CounselorStateT) => {
  switch (status) {
    case 0:
      return '부재중';
    case 1:
      return '상담중';
    case 2:
      return '상담 가능';
    default:
      return '';
  }
};

const getButtonStateText = (status: CounselorStateT) => {
  switch (status) {
    case 0:
      return '지금은 상담이 불가능 합니다.';
    case 1:
      return '지금은 상담 중입니다. ';
    case 2:
      return '지금 바로 연결하기';
    default:
      return '';
  }
};

export { getStateStatus, getListStateText, getButtonStateText };
