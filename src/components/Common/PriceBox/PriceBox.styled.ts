import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
`;

interface PriceLayoutType {
  isDiscount?: boolean;
  color?: string;
}

const PriceLayout = styled.div<PriceLayoutType>`
  position: relative;
  margin-right: 6px;
  padding-left: 20px;
  background-repeat: no-repeat;
  background-position: left center;
  background-size: 16px 16px;
  font-size: 16px;
  font-weight: normal;
  letter-spacing: -0.16px;
  line-height: 20px;
  color: ${props => props.color || 'rgba(0, 0, 0, 0.3)'};

  &:last-child {
    margin-right: 0;
  }

  &:before {
    content: '';
    display: ${props => (props.isDiscount ? 'block' : 'none')};
    position: absolute;
    top: 9px;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 2px;
    background-color: ${props => props.color || 'rgba(0, 0, 0, 0.3)'};
  }
`;

const Clock = styled(PriceLayout)<PriceLayoutType>`
  background-image: url('${process.env
    .APP_IMAGE_URL}/common/clock_ffe055.svg');
  font-size: 11px;
`;

export { Layout, PriceLayout, Clock };
export type { PriceLayoutType };
