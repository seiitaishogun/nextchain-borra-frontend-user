import * as yup from 'yup';

const commonSchema = yup.object().shape({
  name: yup.string().required(),
  data: yup.array().of(
    yup.object({
      name: yup.string().required(),
      order: yup.number().required(),
      children: yup.array().of(
        yup.object({
          name: yup
            .string()
            .test('is_required_index', '필수 입력입니다.', function (value) {
              const { order } = this.parent;

              if (order === 0 || order === 1) {
                return !!value;
              }
              return true;
            }),
          order: yup.number().required(),
        })
      ),
    })
  ),
});

const createSchema = commonSchema.concat(
  yup.object({
    total_count: yup.number().min(1).max(5).required(),
  })
);

const updateSchema = commonSchema;

export { createSchema, updateSchema };
