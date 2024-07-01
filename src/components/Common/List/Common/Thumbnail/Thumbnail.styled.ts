import styled from 'styled-components';

const Layout = styled.div<{ src?: string; size?: number }>`
  position: relative;
  width: ${props => (props.size ? `${props.size}px` : '122px')};
  min-width: ${props => (props.size ? `${props.size}px` : '122px')};
  height: ${props => (props.size ? `${props.size}px` : '122px')};
  border-radius: 6px;
  background: url('${({ src, theme }) =>
      src ||
      `${theme.imageUrl}/contents/thumbnail/default_thumbnail_rectangle.png`}')
    no-repeat center;
  background-size: cover;
`;

const ContentLabel = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 12px;
  width: 28px;
  height: 45px;
  background: url('${props => `${props.theme.imageUrl}/main/label.svg`}')
    no-repeat;
  background-size: contain;
`;

const ContentLabelText = styled.span`
  height: fit-content;
  margin-top: 10px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: -0.16px;
  color: white;
`;

export { Layout, ContentLabel, ContentLabelText };
