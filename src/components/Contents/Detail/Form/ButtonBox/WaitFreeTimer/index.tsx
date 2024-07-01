import { Clock } from '@/components/Common/PriceBox/PriceBox.styled';
import { Layout } from '@/components/Contents/Detail/Form/ButtonBox/WaitFreeTimer/WaitFreeTimer.styled';
import { Props } from '@/components/Contents/Detail/Form/ButtonBox/WaitFreeTimer/types';

function WaitFreeTimer({ waitTime }: Props) {
  return (
    <Layout>
      {waitTime.hour > 0 && (
        <Clock color="#ffe055">
          {waitTime.hour}시간 {waitTime.minute}분
        </Clock>
      )}
      {waitTime.hour === 0 && (
        <Clock color="#ffe055">
          {waitTime.minute}분 {waitTime.second}초
        </Clock>
      )}
      {!waitTime.isUserWaitFree && <span>기다리면 무료</span>}
    </Layout>
  );
}

export default WaitFreeTimer;
