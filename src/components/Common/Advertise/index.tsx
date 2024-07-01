import React, { useEffect } from 'react';
import styled from 'styled-components';
import useAppCheck from '@/hooks/app/useAppCheck';

interface Props {
  style?: React.CSSProperties;
  width?: string;
  height?: string;
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical' | string;
  layoutKey?: string;
  responsive?: boolean;
}

const Layout = styled.div`
  width: 100%;
  height: auto;
  box-sizing: border-box;
`;

function Advertise({
  style,
  width,
  height,
  slot,
  format,
  layoutKey,
  responsive,
}: Props) {
  const { isApp } = useAppCheck();

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.info(err);
    }

    return () => {
      const ele = document.getElementById('adsense-init');
      if (ele) document.body.removeChild(ele);
      window.adsbygoogle = [];
    };
  }, []);

  if (isApp) return null;

  return null;

  return (
    <Layout key={slot} style={style}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          width: width || '100%',
          height,
        }}
        data-ad-client={process.env.ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format || 'auto'}
        data-ad-layout-key={layoutKey}
        data-full-width-responsive={!!responsive}
        data-adtest="on"
      />
    </Layout>
  );
}

export default Advertise;
export type { Props as AdvertiseProps };
