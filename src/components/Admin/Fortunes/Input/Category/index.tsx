import styled from 'styled-components';
import CheckboxLabel from '@/components/Admin/Common/CheckboxLabel';

interface Props {
  checked: any;
  setChecked: any;
}

const Layout = styled.div`
  width: 100%;
`;

function Category({ checked, setChecked }: Props) {
  return (
    <Layout>
      {ROW.map(r => (
        <CheckboxLabel
          key={r[0].label}
          labels={r}
          checked={checked}
          setChecked={setChecked}
        />
      ))}
      <hr />
      {ROW2.map(r => (
        <CheckboxLabel
          key={r[0].label}
          labels={r}
          checked={checked}
          setChecked={setChecked}
        />
      ))}
      <hr />
      {ROW3.map(r => (
        <CheckboxLabel
          key={r[0].label}
          labels={r}
          checked={checked}
          setChecked={setChecked}
        />
      ))}
      <hr />
    </Layout>
  );
}

export default Category;

const ROW = [
  [
    {
      label: '연간',
      value: 0,
    },
    {
      label: '월간',
      value: 1,
    },
    {
      label: '일간',
      value: 2,
    },
    {
      label: '시간',
      value: 3,
    },
  ],
  [
    {
      label: '연간(오행)',
      value: 4,
    },
    {
      label: '월간(오행)',
      value: 5,
    },
    {
      label: '일간(오행)',
      value: 6,
    },
    {
      label: '시간(오행)',
      value: 7,
    },
  ],
  [
    {
      label: '연간(육신)',
      value: 8,
    },
    {
      label: '월간(육신)',
      value: 9,
    },
    {
      label: '일간(육신)',
      value: 10,
    },
    {
      label: '시간(육신)',
      value: 11,
    },
  ],
];
const ROW2 = [
  [
    {
      label: '연지',
      value: 12,
    },
    {
      label: '월지',
      value: 13,
    },
    {
      label: '일지',
      value: 14,
    },
    {
      label: '시지',
      value: 15,
    },
  ],
  [
    {
      label: '연지(오행)',
      value: 16,
    },
    {
      label: '월지(오행)',
      value: 17,
    },
    {
      label: '일지(오행)',
      value: 18,
    },
    {
      label: '시지(오행)',
      value: 19,
    },
  ],
  [
    {
      label: '연지(육신)',
      value: 20,
    },
    {
      label: '월지(육신)',
      value: 21,
    },
    {
      label: '일지(육신)',
      value: 22,
    },
    {
      label: '시지(육신)',
      value: 23,
    },
  ],
];
const ROW3 = [
  [
    {
      label: '대운(천간)',
      value: 24,
    },
    {
      label: '대운(지지)',
      value: 25,
    },
    {
      label: '대운육친(천간)',
      value: 26,
    },
    {
      label: '대운육친(지지)',
      value: 27,
    },
  ],
];
