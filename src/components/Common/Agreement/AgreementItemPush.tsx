import { Control } from 'react-hook-form';
import { useState } from 'react';
import {
  AgreementButton,
  AgreementLabel,
  Layout,
} from '@/components/Common/Agreement/Agreement.styled';
import Popup from '@/components/Common/Popup';
import AgreementDetail, {
  LinksProps,
} from '@/components/Common/Agreement/AgreementDetail';
import ToggleBox from '@/components/Common/Form/ToggleBox';

interface Props {
  name: string;
  control: Control<any>;
  text: string;
  links: Array<LinksProps>;
  handleChange?: () => void;
}

function AgreementItemPush({
  name,
  control,
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
          <AgreementLabel
            htmlFor={name}
            style={{
              color: '#000000',
            }}
          >
            {text}
          </AgreementLabel>

          <AgreementButton type="button" onClick={handleOpenAgreement}>
            자세히
          </AgreementButton>
        </div>
        <ToggleBox name={name} control={control} handleChange={handleChange} />
      </Layout>

      <Popup isOpen={isPopup}>
        <AgreementDetail handleClose={handleClose} links={links} />
      </Popup>
    </>
  );
}

export default AgreementItemPush;
