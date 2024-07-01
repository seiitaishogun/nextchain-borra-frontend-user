import * as yup from 'yup';
import { ContentsTypeE } from '@/types/content';
import { CalendarE } from '@/types/users';

interface Props {
  type: ContentsTypeE;
  isPartner: boolean;
  tarotCount: number;
}

function useContentsRecourse({ type, isPartner, tarotCount }: Props) {
  switch (type) {
    case ContentsTypeE.Saju:
      return {
        schema: isPartner
          ? yup.object().shape({
              user: sajuSchema,
              partner: sajuSchema,
            })
          : yup.object().shape({
              user: sajuSchema,
            }),
        defaultValues: {
          user: defaultSajuValues,
          partner: isPartner ? defaultSajuValues : undefined,
        },
      };
    case ContentsTypeE.Juyeog:
      return {
        schema: yup.object().shape({
          user: tarotSchema,
          outer: yup.number().min(0).max(7).required(),
          inner: yup.number().min(0).max(7).required(),
        }),
        defaultValues: {
          user: defaultTarotValues,
          outer: null,
          inner: null,
        },
      };
    case ContentsTypeE.Tarot:
      return {
        schema: isPartner
          ? yup.object().shape({
              tarot: yup.array().of(yup.string().required()).length(tarotCount),
              user: tarotSchema,
              partner: tarotSchema,
            })
          : yup.object().shape({
              tarot: yup.array().of(yup.string().required()).length(tarotCount),
              user: tarotSchema,
            }),
        defaultValues: {
          tarot: [],
          user: defaultTarotValues,
          partner: isPartner ? defaultTarotValues : undefined,
        },
      };
    default:
      return {
        schema: yup.object().shape({}),
        defaultValues: {},
      };
  }
}

export default useContentsRecourse;

const sajuSchema = yup.object().shape({
  name: yup.string().ensure().required(),
  gender: yup.string().ensure().required(),
  marital: yup.string().ensure().required(),
  year: yup.number().required(),
  month: yup.number().required(),
  day: yup.number().required(),
  calendar: yup.string().required(),
  hour: yup.number().when('is_birthed_time', {
    is: true,
    then: schema => schema.required(),
    otherwise: schema => schema.transform(() => 1).notRequired(),
  }),
  minute: yup.number().when('is_birthed_time', {
    is: true,
    then: schema => schema.required(),
    otherwise: schema => schema.transform(() => 1).notRequired(),
  }),
  is_birthed_time: yup.boolean().required(),
});

const defaultSajuValues = {
  name: '',
  gender: '',
  marital: '',
  year: 1990,
  month: 1,
  day: 1,
  calendar: CalendarE.Solar,
  hour: '',
  minute: '',
  is_birthed_time: true,
};

const tarotSchema = yup.object().shape({
  name: yup.string().ensure().required(),
  gender: yup.string().ensure().required(),
});

const defaultTarotValues = {
  name: '',
  gender: '',
};
