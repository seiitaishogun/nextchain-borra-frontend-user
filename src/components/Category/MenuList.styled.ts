import styled from 'styled-components';

const MenuLayout = styled.ul`
  margin-top: 16px;
  display: grid;
  grid-template-columns: 156px 156px;
  column-gap: 16px;
  row-gap: 16px;
`;

const MenuItem = styled.li<{ src?: string }>`
  padding: 14px 16px;
  border-radius: 6px;
  border: solid 1px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;

    .menu-icon {
      width: 16px;
      height: 16px;
      margin-right: 8px;
      background: ${({ src }) => `url(${src}) no-repeat center`};
    }
  }
`;
export { MenuLayout, MenuItem };
