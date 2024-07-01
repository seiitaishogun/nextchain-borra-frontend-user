import React, { useCallback, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Layout } from '@/components/Contents/Detail/Form/ButtonBox/ButtonBox.styled';
import { Layout as WaitFreeTimer } from '@/components/Contents/Detail/Form/ButtonBox/WaitFreeTimer/WaitFreeTimer.styled';
import LikeButton from '@/components/Contents/Detail/Form/ButtonBox/LikeButton';
import { Clock } from '@/components/Common/PriceBox/PriceBox.styled';
import { CounselorButton } from '@/components/Counselor/Detail/ButtonBox/Button.styled';
import { getButtonStateText, getStateStatus } from '@/utils/counselor';
import { COUNSELOR_PHONE_NUMBER } from '@/constants/counselor';
import { CounselorDetailT } from '@/types/counselor/detail';
import useUpdateLike from '@/hooks/counselor/useUpdateLike';
import useAlert from '@/hooks/common/useAlert';
import useDataCollection from '@/hooks/sdk/useDataCollection';
import { userInfoState } from '@/store/auth';

interface Props {
  data: CounselorDetailT;
  isLike: boolean;
}

function CounselorButtonBox({ data, isLike }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const userInfo = useRecoilValue(userInfoState);
  const { renderMessage, setAlertOptions, handleReset } = useAlert();
  const { handleUpdateLike } = useUpdateLike({
    counselor: data,
    setAlertOptions,
    handleReset,
  });
  const { handleCounselorConnectEvent } = useDataCollection();

  const disabled = useMemo(() => !getStateStatus(data.state), [data.state]);
  const buttonText = useMemo(
    () => getButtonStateText(data.state),
    [data.state]
  );
  const handleClick = useCallback(() => {
    if (disabled || isLoading) return;
    setIsLoading(true);
    handleCounselorConnectEvent({
      counselor_id: data.id,
      counselor_c_id: data.c_id,
      counselor_name: data.name,
      user_id: userInfo?.id || null,
      user_name: userInfo?.name || null,
    });

    document.location.href = `tel:${COUNSELOR_PHONE_NUMBER}`;
    setIsLoading(false);
  }, [disabled, isLoading, data, userInfo]);

  return (
    <Layout>
      <LikeButton isLike={isLike} handleUpdateLike={handleUpdateLike} />
      <CounselorButton
        type="button"
        className="btn-submit"
        disabled={disabled}
        onClick={handleClick}
      >
        {!!data.is_free && (
          <WaitFreeTimer>
            <Clock color="#ffe055">5분 무료 상담</Clock>
          </WaitFreeTimer>
        )}
        <span>{buttonText}</span>
      </CounselorButton>

      {renderMessage()}
    </Layout>
  );
}

export default CounselorButtonBox;
