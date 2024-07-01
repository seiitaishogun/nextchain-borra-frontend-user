import styled from 'styled-components';
import {
  HEIGHT,
  WIDTH,
} from '@/components/Contents/Detail/Form/Juyeog/Card/constants';

const SelectedCard = styled.section<{ cardImg?: string }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  margin-top: 8px;

  .type {
    display: none;
    //display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    width: 40px;
    height: 33px;
    border-radius: 100px;
    border: solid 1px rgba(0, 0, 0, 0.08);
    color: rgba(0, 0, 0, 0.8);
    font-size: 14px;
    font-weight: 500;
    letter-spacing: -0.18px;
    cursor: default;
  }

  .card {
    width: ${WIDTH * 1.5}px;
    height: ${HEIGHT * 1.5}px;
    background: url(${({ cardImg }) => cardImg}) no-repeat center;
    background-size: contain;
  }
`;

const Board = styled.div`
  padding: 16px 16px;
  background: rgb(178 178 178 / 12%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > div:first-child {
    border: 1px solid rgba(0, 0, 0, 0.8);
    color: rgba(0, 0, 0, 0.8);
  }

  .card-types {
    display: flex;

    .type {
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      height: 33px;
      padding: 8px;
      margin-right: 8px;
      border-radius: 6px;
      border: solid 1px rgba(0, 0, 0, 0.08);
      color: rgba(0, 0, 0, 0.8);
      font-size: 14px;
      font-weight: 500;
      letter-spacing: -0.18px;
      cursor: default;

      &.active {
        border: solid 1px rgba(0, 0, 0, 0.08);
        background-color: rgb(125 126 126 / 60%);
        color: #ffffff;
      }
    }
  }

  .board {
    position: relative;
    box-sizing: border-box;
    margin-top: 12px;
    width: 100%;
    height: ${HEIGHT * 2}px;
    perspective: 1000px;
  }

  .juyeog {
    position: absolute;
    right: 23px;
    bottom: 0;
  }
`;

export { SelectedCard, Board };
