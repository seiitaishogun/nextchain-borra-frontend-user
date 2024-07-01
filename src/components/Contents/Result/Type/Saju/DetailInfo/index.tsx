import CloseIcon from '@mui/icons-material/Close';
import {
  DaeunSection,
  InfoHeader,
  Layout,
  MessageBox,
  SajuBox,
  SajuSection,
} from '@/components/Contents/Result/DetailInfo.styled';

interface SajuT {
  cheongan: Array<Array<string>>;
  daeun: {
    age: Array<string>;
    gan: Array<string>;
    ji: Array<string>;
    name: string;
  };
  jiji: Array<Array<string>>;
}

interface Props {
  data: SajuT;
  name: string;
  handleClose: () => void;
}

function DetailInfo({ data, name, handleClose }: Props) {
  return (
    <Layout>
      <InfoHeader>
        <h4>{name}님의 사주 분석</h4>
        <button type="button" onClick={handleClose}>
          <CloseIcon />
        </button>
      </InfoHeader>

      <SajuSection>
        <table>
          <thead>
            <tr>
              <th />
              <th>시주</th>
              <th>일주</th>
              <th>월주</th>
              <th>년주</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <h4 className="saju-ttl05">천간</h4>
              </th>
              {data.cheongan.map((item, idx) => (
                <td key={idx}>
                  <SajuBox>
                    <span>{item[1]}</span>
                    <span>{item[0]}</span>
                    <span>{item[2]}</span>
                  </SajuBox>
                </td>
              ))}
            </tr>
            <tr>
              <th>
                <h4 className="saju-ttl05">지지</h4>
              </th>
              {data.jiji.map((item, idx) => (
                <td key={idx}>
                  <SajuBox>
                    <span>{item[1]}</span>
                    <span>{item[0]}</span>
                    <span>{item[2]}</span>
                  </SajuBox>
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        <MessageBox>
          사주팔자는 사주의 간지(干支)가 되는 여덟 글자를 말하며, 이를 통해
          인생의 전반적인 길흉화복을 점치게 됩니다. 위의 표에 있는 8자의 한자를
          사주팔자라고 하며, 고객님의 사주 속에 숨겨진 인생 암호를 쉽게 풀이할
          수 있도록 만세력을 기반으로 결과값을 뽑아낸 것입니다.
        </MessageBox>
      </SajuSection>

      <DaeunSection>
        <table>
          <thead>
            <tr>
              <th colSpan={data.daeun.gan.length}>
                <div className="daeun-ttl-area">{data.daeun.name}</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {data.daeun.gan.map(item => (
                <td>{item}</td>
              ))}
            </tr>
            <tr>
              {data.daeun.ji.map(item => (
                <td>{item}</td>
              ))}
            </tr>
            <tr>
              {data.daeun.age.map(item => (
                <td>{item}</td>
              ))}
            </tr>
          </tbody>
        </table>

        <MessageBox>
          인생을 살다보면 운세의 기운이 바뀌는 시기가 올 때가 있습니다. 흔히
          터닝포인트라고 하기도 하며 인생에서 장기간 큰 영향을 미치는 운으로
          10년을 주기로 변화합니다.
          <br />
          <br />
          위의 표는 고객님 사주명식을 분석하여 대운의 흐름을 파악한 것으로
          숫자는 그 해의 나이이며, 한자는 10년마다 바뀌는 대운의 간지를
          의미합니다.
        </MessageBox>
      </DaeunSection>
    </Layout>
  );
}

export default DetailInfo;
export type { SajuT };
