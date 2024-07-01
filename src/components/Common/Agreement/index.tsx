import { Control } from 'react-hook-form';
import {
  AgreementAll,
  AgreementBox,
} from '@/components/Common/Agreement/Agreement.styled';
import AgreementItem from '@/components/Common/Agreement/AgreementItem';
import Checkbox from '@/components/Common/Form/Checkbox';
import { LinksProps } from '@/components/Common/Agreement/AgreementDetail';
import AgreementItemPush from '@/components/Common/Agreement/AgreementItemPush';

interface Props {
  variant?: 'push' | 'service';
  isAllChecked: boolean;
  handleAllCheck?: () => void;
  control: Control<any>;
  items: Array<{
    name: string;
    isRequired: boolean;
    text: string;
    links: Array<LinksProps>;
    handleChange?: () => void;
  }>;
}

function Agreement({
  variant,
  isAllChecked,
  handleAllCheck,
  control,
  items,
}: Props) {
  return (
    <AgreementBox>
      {isAllChecked && (
        <AgreementAll>
          <Checkbox
            name="is_agree_all"
            control={control}
            handleChange={handleAllCheck}
          />
          <label htmlFor="is_agree_all">약관 전체 동의하기</label>
        </AgreementAll>
      )}

      {items.map(item =>
        variant === 'push' ? (
          <AgreementItemPush key={item.name} control={control} {...item} />
        ) : (
          <AgreementItem key={item.name} control={control} {...item} />
        )
      )}
    </AgreementBox>
  );
}

Agreement.defaultProps = {
  variant: 'service',
};

export default Agreement;
