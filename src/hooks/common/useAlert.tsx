import { useState } from 'react';
import Message, { MessageProps } from '@/components/Common/Popup/Message';

function useAlert() {
  const [alertOptions, setAlertOptions] = useState<MessageProps>({
    isOpen: false,
    title: '',
    description: '',
    confirmText: '',
    handleConfirm: () => {},
  });

  const handleReset = () => {
    setAlertOptions({
      isOpen: false,
      title: '',
      description: '',
      confirmText: '',
      handleConfirm: () => {},
    });
  };

  const renderMessage = () => <Message {...alertOptions} />;

  return {
    renderMessage,
    setAlertOptions,
    handleReset,
  };
}

export default useAlert;
