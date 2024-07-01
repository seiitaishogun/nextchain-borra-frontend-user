import styled from 'styled-components';
import {
  HEIGHT,
  WIDTH,
} from '@/components/Contents/Detail/Form/Tarot/Card/constants';

const Layout = styled.form`
  position: relative;
  padding: 16px 11px;
`;

const Layer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const MessageBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  width: auto;
  max-width: 80%;
  line-height: initial;
  border-radius: 8px;
  box-sizing: border-box;
  border: solid 1px ${({ theme }) => theme.colors.purple22};
  color: ${({ theme }) => theme.colors.purple22};
  font-size: 14px;
  text-align: center;
`;

const ContentLayout = styled.section<{ align?: 'center' | 'left' | 'right' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.deviceMargin};
  margin: 32px 16px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: 0 6px 8px 0 rgba(0, 0, 0, 0.05);
  font-size: 14px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.8);
  line-height: 18px;
  word-break: keep-all;

  > span {
    display: inline-block;
    position: relative;
    margin-left: 10px;
    text-align: ${props => props.align || 'center'};

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: -18px;
      width: 16px;
      height: 16px;
      background-image: url('${process.env
        .APP_IMAGE_URL}/layout/aside/bulb.png');
      background-repeat: no-repeat;
      background-size: 100%;
    }
  }
`;

const FormBox = styled.div`
  padding: 0 16px;
`;

const CardSection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  height: 350px;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 20px 0 40px;
  box-sizing: border-box;
  background-color: rgba(137, 134, 255, 0.12);

  .swiper {
    width: ${WIDTH}px;
    height: ${HEIGHT}px;

    .swiper-slide {
      overflow: visible;
    }
  }

  &.end::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(137, 134, 255, 0.1);
    z-index: 5;
  }
`;

const ContentGuideLayout = styled.div`
  margin-top: 20px;

  ${ContentLayout} {
    margin: 15px 0 20px;
  }
`;

export {
  Layout,
  Layer,
  MessageBox,
  ContentLayout,
  FormBox,
  CardSection,
  ContentGuideLayout,
};
