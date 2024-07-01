import styled from 'styled-components';

const CounselorStateIcon = styled.div<{ bg?: string; isActive?: boolean }>`
  display: inline-flex;
  width: auto;
  min-width: 40px;
  height: 25px;
  padding: 0 8px;
  border-radius: 5px;
  box-sizing: border-box;
  background: ${props =>
    props.bg ||
    (props.isActive ? props.theme.colors.primary : 'rgba(0, 0, 0, 0.5)')};
  font-size: 10px;
  line-height: 25px;
  text-align: center;
  color: #fff;
`;

const CounselorStateBox = styled.div`
  ${CounselorStateIcon} {
    margin-right: 5px;

    &:last-child {
      margin-right: 0;
    }
  }
`;

export { CounselorStateBox, CounselorStateIcon };
