function useAppCsChat() {
  const appCsChat = () => {
    window?.flutter_inappwebview?.callHandler(
      'content_cschat',
      'http://pf.kakao.com/_ymuIC/chat'
    );
  };

  return {
    appCsChat,
  };
}

export default useAppCsChat;
