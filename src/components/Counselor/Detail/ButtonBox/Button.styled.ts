import styled from 'styled-components';
import { buttonStyle } from '@/components/Common/Button/Button.styled';

const CounselorButton = styled.button<{ bgColor?: string }>`
  ${buttonStyle};
  background: ${props => props.bgColor || props.theme.colors.primary};

  &:disabled {
    background: rgba(0, 0, 0, 0.5);
  }
`;

export { CounselorButton };
