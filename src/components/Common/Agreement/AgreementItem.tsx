import { Control } from 'react-hook-form';
import { useState } from 'react';
import {
  AgreementButton,
  AgreementLabel,
  AgreementLabelSpan,
  Layout,
} from '@/components/Common/Agreement/Agreement.styled';
import Checkbox from '@/components/Common/Form/Checkbox';
import Popup from '@/components/Common/Popup';
import AgreementDetail, {
  LinksProps,
} from '@/components/Common/Agreement/AgreementDetail';

interface Props {
  name: string;
  control: Control<any>;
  isRequired: boolean;
  text: string;
  links: Array<LinksProps>;
  handleChange?: () => void;
}

function AgreementItem({
  name,
  control,
  isRequired,
  text,
  links,
  handleChange,
}: Props) {
  const [isPopup, setIsPopup] = useState(false);

  const handleOpenAgreement = () => {
    setIsPopup(true);
  };
  const handleClose = () => {
    setIsPopup(false);
  };

  return (
    <>
      <Layout>
        <div>
          <Checkbox name={name} control={control} handleChange={handleChange} />
          <AgreementLabel htmlFor={name}>
            <AgreementLabelSpan>
              [{isRequired ? '필수' : '선택'}]
            </AgreementLabelSpan>{' '}
            {text}
          </AgreementLabel>
        </div>
        <div>
          <AgreementButton type="button" onClick={handleOpenAgreement}>
            자세히
          </AgreementButton>
        </div>
      </Layout>

      <Popup isOpen={isPopup}>
        <AgreementDetail handleClose={handleClose} links={links} />
      </Popup>
    </>
  );
}

export default AgreementItem;
