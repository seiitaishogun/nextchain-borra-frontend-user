import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import NormalDescription from '@/components/Contents/Result/Template/Description/Normal';
import Item from '@/components/Contents/Result/Type/Jamidusu/DetailInfo/Item';
import Info from '@/components/Contents/Result/Type/Jamidusu/DetailInfo/Info';
import {
  InfoHeader,
  Layout,
  MyeongbanInfoSection,
  MyeongbanSection,
} from '@/components/Contents/Result/DetailInfo.styled';
import Myeongban from '@/components/Contents/Result/Type/Jamidusu/DetailInfo/Myeongban.json';
import { MyeongbanT } from '@/api/content';

interface Props {
  data: MyeongbanT;
  user: {
    name: string;
    gender: number;
    marital: string;
    birthed_at: string;
  };
  handleClose: () => void;
}

function MyeongbanDetailInfo({ data, user, handleClose }: Props) {
  const [sungTabIndex, setSungTabIndex] = useState(0);
  const [gungTabIndex, setGungTabIndex] = useState(0);
  const [bojwaseongTabIndex, setBojwaseongTabIndex] = useState(0);
  const [salseongTabIndex, setSalseongTabIndex] = useState(0);

  const { sung, gung, bojwaseong, salseong } = Myeongban;
  const { myeongban }: MyeongbanT = data;
  const { name, gender, marital, birthed_at } = user;

  /**
   * 14주성 설명
   * 12사항궁 설명
   * 보좌성 설명
   * 살성 설명
   */
  const sungs = sung && sung.map(s => s.name);
  const gungs = gung && gung.map(s => s.name);
  const bojwaseongs = bojwaseong && bojwaseong.map(s => s.name);
  const salseongs = salseong && salseong.map(s => s.name);

  return (
    <Layout>
      <InfoHeader>
        <h4>{name}님의 명반</h4>
        <button type="button" onClick={handleClose}>
          <CloseIcon />
        </button>
      </InfoHeader>

      <MyeongbanSection>
        <div className="container">
          <Item data={myeongban[3]} />
          <Item data={myeongban[4]} />
          <Item data={myeongban[5]} />
          <Item data={myeongban[6]} />
          <Item data={myeongban[2]} />
          <div className="item info">
            <p>
              {`${name} / ${marital} /`}
              {gender ? ' 여자' : ' 남자'}
            </p>
            <p>{birthed_at}</p>
          </div>
          <Item data={myeongban[7]} />
          <Item data={myeongban[1]} />
          <Item data={myeongban[8]} />
          <Item data={myeongban[0]} />
          <Item data={myeongban[11]} />
          <Item data={myeongban[10]} />
          <Item data={myeongban[9]} />
        </div>

        <NormalDescription
          name="명반이란"
          contents="자미두수에서 쓰이는 별자리표를 명반(命盤) 이라고 부르며, 자신만이
          타고난 운명의 모습이 알려주는 그릇이라고 할 수 있습니다. 이 명반은
          우리가 살고 있는 대지를 상징하는 것으로 총 12개의 궁(宮)이라고 부르는
          공간으로 나눕니다.<br/><br/>  이 12개의 궁은 태양이 지나는 길인 황도 12궁을 형상화 한 것이고 이
          12개의 궁에 고유의 14개의 주성(별)이 생년월일시에 따라서 자리를 잡게
          됩니다.<br/><br/>  각각의 자리에 배치된 별들은 각 자리에 해당하는 12사항궁에 따라
          길흉성패를 나타내게 되며 연관이 있는 다른 궁과 서로 긴밀한 영향을 주고
          받아요. 이렇게 이루어진 명반은 그 주인이 살아가야 할 타고난 운명과
          앞으로 살아가야 할 인생의 길을 정확하고 명료하게 알 수 있게
          해준답니다."
        />
      </MyeongbanSection>

      <MyeongbanInfoSection>
        <Info
          title="14주성"
          tabs={sungs}
          tabIndex={sungTabIndex}
          setTabIndex={setSungTabIndex}
          data={sung}
        />
        <Info
          title="12사항궁"
          tabs={gungs}
          tabIndex={gungTabIndex}
          setTabIndex={setGungTabIndex}
          data={gung}
        />
        <Info
          title="보좌성"
          tabs={bojwaseongs}
          tabIndex={bojwaseongTabIndex}
          setTabIndex={setBojwaseongTabIndex}
          data={bojwaseong}
        />
        <Info
          title="살성"
          tabs={salseongs}
          tabIndex={salseongTabIndex}
          setTabIndex={setSalseongTabIndex}
          data={salseong}
        />
      </MyeongbanInfoSection>
    </Layout>
  );
}

export default MyeongbanDetailInfo;
