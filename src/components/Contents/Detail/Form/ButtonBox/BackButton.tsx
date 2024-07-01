import classNames from 'classnames';
import React from 'react';
import styled from 'styled-components';

interface Props {
  handleBack: () => void;
}

const Layout = styled.button`
  background: url('${process.env
      .APP_IMAGE_URL}/layout/header/arrow_left.svg')
    no-repeat center center #ffffff;
`;

function BackButton({ handleBack }: Props) {
  return (
    <Layout
      type="button"
      className={classNames('btn-left', 'btn-back')}
      onClick={handleBack}
    >
      뒤로가기
    </Layout>
  );
}

export default BackButton;
export type { Props as BackButtonProps };
