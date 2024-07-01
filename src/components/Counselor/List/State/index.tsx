import {
  CounselorStateBox,
  CounselorStateIcon,
} from '@/components/Counselor/List/State/State.styled';
import { getListStateText, getStateStatus } from '@/utils/counselor';
import { CounselorStateT } from '@/types/counselor';

interface Props {
  state: CounselorStateT;
  is_free: boolean;
}

function CounselorState({ state, is_free }: Props) {
  const isActive = getStateStatus(state);
  const text = getListStateText(state);
  return (
    <CounselorStateBox>
      <CounselorStateIcon isActive={isActive}>{text}</CounselorStateIcon>
      {is_free && (
        <CounselorStateIcon bg="#ff3232">5분 무료</CounselorStateIcon>
      )}
    </CounselorStateBox>
  );
}

export default CounselorState;
