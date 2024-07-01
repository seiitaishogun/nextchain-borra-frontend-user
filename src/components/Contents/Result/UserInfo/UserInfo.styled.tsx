import styled from 'styled-components';

const FlexSpaceBetween = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const SajuInfoButton = styled.button`
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.theme.colors.primary};
  line-height: 17px;
`;

export { FlexSpaceBetween, SajuInfoButton };
