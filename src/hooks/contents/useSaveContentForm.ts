import { useEffect } from 'react';
import debounce from 'lodash.debounce';
import { setContentFormStorage } from '@/utils/content/form';

interface Props {
  contentId: number;
  isDirty: boolean;
  formValues: any;
}

function useSaveContentForm({ contentId, isDirty, formValues }: Props) {
  useEffect(() => {
    const saveFormValues = debounce(values => {
      setContentFormStorage(contentId, values);
    }, 1000);

    if (isDirty) saveFormValues(formValues);

    return () => {
      saveFormValues.cancel();
    };
  }, [formValues]);
}

export default useSaveContentForm;
