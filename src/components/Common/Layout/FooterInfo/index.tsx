import { useState } from 'react';
import { useRouter } from 'next/router';
import { Layout } from '@/components/Common/Layout/FooterInfo/FooterInfo.styled';

import Popup from '@/components/Common/Popup';
import AgreementDetail, {
  LinksProps,
} from '@/components/Common/Agreement/AgreementDetail';

interface AgreementsProps {
  text: string;
  links: Array<LinksProps>;
}

function FooterInfo() {
  const router = useRouter();
  const [isPopup, setIsPopup] = useState(false);
  const [modalData, setModalData] = useState<Array<LinksProps>>([]);

  return (
    <Layout>
      <div className="footerInfo">
        <ul>
          {AGREEMENTS.map((item: AgreementsProps) => (
            <li key={item.text}>
              <button
                type="button"
                onClick={() => {
                  setIsPopup(true);
                  setModalData(item.links);
                }}
              >
                <a>{item.text}</a>
              </button>
            </li>
          ))}

          <li>
            <button
              type="button"
              onClick={() => {
                router.push('/posts/17');
              }}
            >
              이용약관
            </button>
          </li>
        </ul>
      </div>

      <Popup isOpen={isPopup} handleClose={() => setIsPopup(false)}>
        <AgreementDetail
          handleClose={() => setIsPopup(false)}
          links={modalData}
        />
      </Popup>

      <div className="companyInfo">
        <dl>
          <dd>㈜에프엘이에스</dd>
        </dl>
        <dl>
          <dt>주소</dt>
          <dd>서울특별시 서초구 서초대로 398, 627호</dd>
        </dl>
        <dl>
          <dt>대표</dt>
          <dd>김우현</dd>
        </dl>
        <dl>
          <dt>사업자등록번호</dt>
          <dd>174-81-01556</dd>
        </dl>
        <dl>
          <dt>통신판매업 신고번호</dt>
          <dd>2020-서울금천-0132</dd>
        </dl>
        <dl>
          <dt>고객센터</dt>
          <dd>02-6956-5671 , fles@fles.co.kr</dd>
        </dl>
        <dl>
          <dt>FAX</dt>
          <dd>02-6956-5672</dd>
        </dl>
      </div>
    </Layout>
  );
}

export default FooterInfo;

// TODO 이용약관 추후 작업
const AGREEMENTS = [
  {
    text: '개인정보처리방침',
    links: [
      {
        height: '100%',
        link: 'https://app.catchsecu.com/document/P/0679c5f53dc81cc',
      },
    ],
  },
  // {
  //   text: '이용약관',
  //   links: [
  //     {
  //       height: 530,
  //       link: 'https://borra.today/posts/17',
  //     },
  //   ],
  // },
];
