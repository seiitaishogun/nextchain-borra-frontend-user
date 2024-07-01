import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { normalize } from 'styled-normalize';
import theme from '@/styles/Theme';

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${normalize}
  html,
  body {
    font-family: ${theme.fontFamilies.pretendard};
  }

  img {
    display: block;
    max-width: 100%;
  }

  a {
    color: #222;
    text-decoration: none;
    display: block;
    cursor: pointer;

    &:hover {
      color: ${theme.colors.primary};
    }
  }

  span {
    word-break: keep-all;
  }

  em {
    font-style: italic;
  }

  table tr td,
  table tr th {
    vertical-align: middle;
  }

  button {
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
  }

  fieldset {
    padding: 0;
  }

  .react-datepicker-popper {
    z-index: 99 !important;
  }
`;

export default GlobalStyle;
