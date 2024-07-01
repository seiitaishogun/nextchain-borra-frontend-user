import * as yup from 'yup';

const updateSchema = yup.object().shape({
  counselor_id: yup.number().required(),
  thumbnail_id: yup.number().nullable(),
  banner_id: yup.number().nullable(),
});

export { updateSchema };
