import styled from 'styled-components';

const Layout = styled.article`
  width: 100%;
  height: 100vh;
  padding: 20px 16px;
  overflow-y: scroll;
  box-sizing: border-box;
  background: #ffffff;
  font-size: 15px;
  line-height: 1.75;
  word-break: normal;
  font-weight: 500;
`;

const InfoHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 50px;
  padding: 0 16px;
  box-sizing: border-box;
  background: #ffffff;
  z-index: 999;

  h4 {
    margin-left: 30px;
    text-align: center;
    width: inherit;
    font-size: 16px;
    font-weight: 600;
  }

  button {
    svg {
      width: 30px;
      height: 30px;
    }
  }
`;

const Section = styled.section`
  margin: 50px 0;
`;

const MyeongbanSection = styled(Section)`
  .container {
    display: grid;
    grid-auto-rows: minmax(90px, auto);
    grid-template-columns: 1fr 1fr 1fr 1fr;
    border: 1px solid #71a0b4;
  }

  .info {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    grid-column: span 2;
    grid-row: span 2;
    border: 1px solid #71a0b4;
  }
`;
const MyeongbanInfoSection = styled(Section)`
  .description {
    display: block;
    margin: 16px 0;
    padding: ${props => props.theme.deviceMargin};
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 8px;
    box-sizing: border-box;
    box-shadow: 0 6px 8px 0 rgba(0, 0, 0, 0.05);
    background: ${({ theme }) => theme.colors.white};

    p {
      margin-top: 10px;
      word-break: keep-all;
    }
  }
`;
const SajuSection = styled(Section)`
  table {
    width: 100%;
    height: 153px;
    border-left: 1px solid #72b490;
    border-top: 1px solid #72b490;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    color: #183c92;

    thead tr th {
      width: 20%;
      height: 35px;
      border-bottom: 1px solid #72b490;
      border-right: 1px solid #72b490;
      background: #d9e5b5;
    }

    tbody tr th,
    tbody tr td {
      width: 20%;
      height: 42px;
      border-bottom: 1px solid #72b490;
      border-right: 1px solid #72b490;
    }

    tbody tr th {
      color: #705022;
    }
  }
`;

const SajuBox = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  height: 100%;
  padding: 8px 4px 4px;
  box-sizing: border-box;
  color: #36521c;

  span:nth-child(2) {
    align-self: flex-end;
    font-size: 24px;
    color: #183c92;
  }
`;

const DaeunSection = styled.section`
  margin-top: 40px;

  table {
    width: 100%;
    border-left: 1px solid #71a0b4;
    border-top: 1px solid #71a0b4;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

    thead tr {
      background: #b4dde6;
    }

    thead tr th {
      height: 41px;
      border-bottom: 1px solid #71a0b4;
      border-right: 1px solid #71a0b4;
    }

    tbody tr td {
      width: 42px;
      height: 42px;
      background: white;
      border-bottom: 1px solid #72b490;
      border-right: 1px solid #72b490;
      text-align: center;
      font-size: 22px;
      color: #183c92;
    }

    tbody tr:last-child td {
      font-size: 14px;
      color: #3b3b3b;
    }
  }
`;

const MessageBox = styled.p`
  margin: 10px 0;
`;

export {
  Layout,
  MyeongbanSection,
  MyeongbanInfoSection,
  InfoHeader,
  SajuSection,
  SajuBox,
  MessageBox,
  DaeunSection,
};
