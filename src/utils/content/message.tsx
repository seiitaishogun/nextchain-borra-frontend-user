const getErrorMessage = (err: any) => {
  const { status } = err.response;

  switch (status) {
    case 302:
      return '로그인 후 이용해주세요.';
    case 402:
      return (
        <p>
          코인이 부족합니다.
          <br />이 콘텐츠를 보기 위해서는 코인 충전이 필요합니다.
        </p>
      );
    case 403:
      return '정상적이지 않은 콘텐츠입니다.';
    case 404:
      return '존재하지 않는 콘텐츠입니다.';
    case 500:
      return '서버 오류입니다. 잠시 후 다시 시도해주세요.';
    default:
      return '오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
  }
};

export { getErrorMessage };
