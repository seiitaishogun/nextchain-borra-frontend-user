import styled, { css } from 'styled-components';

const ButtonLayout = styled.button<{
  primary?: boolean;
  shadow?: boolean;
  border?: boolean;
}>`
  width: auto;
  border: none;
  box-sizing: border-box;
  text-align: center;
  background-color: transparent;
  padding: 21px 33px;
  border-radius: 35px;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  cursor: pointer;

  ${props =>
    props.primary &&
    css`
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.white};
    `}

  ${props =>
    props.border &&
    css`
      border: solid 2px #e1e8f4;
      background-color: ${({ theme }) => theme.colors.white};
      color: ${({ theme }) => theme.colors.grey};

      &:focus {
        border: none;
        background-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.white};
        box-shadow: 0 5px 10px 0 rgba(137, 134, 255, 0.5);
      }
    `}

  ${props =>
    props.shadow &&
    css`
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.white};
    `}
`;

const buttonStyle = css<{ bgColor?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 52px;
  padding: 0 10px;
  border-radius: 10px;
  border: none;
  box-sizing: border-box;
  background: ${props => props.theme.colors.primary};
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
  vertical-align: middle;
  cursor: pointer;
`;

const activeButtonStyle = css`
  ${buttonStyle};
  background: rgba(0, 0, 0, 0.5);

  &:hover {
    background: ${props => props.theme.colors.primary};
  }
`;

export { ButtonLayout, buttonStyle, activeButtonStyle };
