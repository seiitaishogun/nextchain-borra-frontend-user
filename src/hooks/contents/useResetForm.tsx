import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useFormContext } from 'react-hook-form';

const Confirm = dynamic(() => import('@/components/Common/Popup/Confirm'), {
  ssr: false,
});

function useResetForm() {
  const [openConfirm, setOpenConfirm] = useState<'user' | 'partner' | null>(
    null
  );
  const { resetField } = useFormContext();

  const handleCancel = () => setOpenConfirm(null);

  const handleOpenUserConfirm = () => setOpenConfirm('user');
  const handleOpenPartnerConfirm = () => setOpenConfirm('partner');

  const renderResetConfirm = () => (
    <Confirm
      isOpen={!!openConfirm}
      title="다른 사주 입력"
      description={
        <p>
          입력하신 정보가 사라집니다.
          <br />
          정말로 다른 사주를 입력하시겠습니까?
        </p>
      }
      handleCancel={handleCancel}
      confirmText="다른 사주 입력"
      handleConfirm={() => {
        resetField(openConfirm === 'user' ? 'user' : 'partner');
        handleCancel();
      }}
    />
  );

  return {
    handleOpenUserConfirm,
    handleOpenPartnerConfirm,
    renderResetConfirm,
  };
}

export default useResetForm;
