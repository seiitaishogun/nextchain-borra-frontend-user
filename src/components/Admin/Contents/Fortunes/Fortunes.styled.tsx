import styled from 'styled-components';

const Layout = styled.div`
  margin-top: 50px;
  position: relative;

  > button {
    display: block;
    margin-left: auto;
    white-space: nowrap;
  }
`;
const ParentLayout = styled(Layout)`
  margin-top: 10px;
  padding: 10px 20px;
  border-top: 2px solid #dedede;

  > button {
    margin-top: 10px;
    display: block;
    margin-left: auto;
    white-space: nowrap;
  }
`;
const ChildrenLayout = styled(Layout)`
  margin-top: 10px;
  padding: 10px 0 10px 20px;
  border-top: 2px solid #dedede;
  background-color: #ffffff;

  .groupContent > button {
    display: block;
    margin-left: auto;
  }
`;
const UtilWrap = styled.div`
  display: flex;
  justify-content: end;
  padding-bottom: 10px;
`;

const ChildIconRender = styled.div<{ image: string }>`
  width: 30px;
  height: 25px;
  margin-right: 10px;
  background: url('${({ image }) => image}') no-repeat center center;
  background-size: 20px 20px;
`;

export { Layout, ParentLayout, ChildrenLayout, UtilWrap, ChildIconRender };
