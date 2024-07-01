import styled from 'styled-components';

const PageLayout = styled.section`
  min-width: 1250px;

  h1 {
    font-size: ${({ theme }) => theme.fontSizes.lg_xx};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }
`;
const Util = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const EditorViewLayout = styled.div`
  .ck-content {
    width: inherit;
    line-height: 50px;
    height: 50px;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-word;

    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-align: left;
  }

  .ck-content p {
    margin-block-start: 0;
    margin-block-end: 0;
    font-size: inherit;
  }
`;

export { PageLayout, Util, EditorViewLayout };
