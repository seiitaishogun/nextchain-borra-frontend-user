import React from 'react';
import { useRecoilValue } from 'recoil';
import { Layout } from '@/components/Contents/Detail/Form/ButtonBox/ButtonBox.styled';
import Button from '@/components/Contents/Detail/Form/ButtonBox/Button';
import { ContentDetailT } from '@/types/content/detail';
import { loginState } from '@/store/auth';

interface Props {
  content: ContentDetailT;
  handleSubmit: () => void;
}

function withPurchaseButton(Component: React.ComponentType<any>) {
  return function <T>({ content, handleSubmit, ...props }: Props & T) {
    const isLogin = useRecoilValue(loginState);
    return (
      <Layout>
        {isLogin && <Component {...props} />}
        <Button content={content} handleSubmit={handleSubmit} />
      </Layout>
    );
  };
}

export default withPurchaseButton;
