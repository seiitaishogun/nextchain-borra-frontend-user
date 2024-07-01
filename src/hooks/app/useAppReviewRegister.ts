function useAppReviewRegister() {
  const appReviewRegister = () => {
    window?.flutter_inappwebview?.callHandler(
      'app_review_register',
      'request review'
    );
  };

  return {
    appReviewRegister,
  };
}

export default useAppReviewRegister;
