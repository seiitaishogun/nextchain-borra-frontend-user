import React from 'react';
import { Button, Grid } from '@mui/material';
import Link from 'next/link';
import SurveyInput from '@/components/Admin/Survey/Form/SurveyInput';
import SurveyNameInput from '@/components/Admin/Survey/Form/SurveyNameInput';
import LabelGroup from '@/components/Admin/Common/Form/LabelGroup';
import { SurveyT } from '@/types/admin/survey/detail';

interface Props {
  data: SurveyT;
}

function SurveyUpdateForm({ data }: Props) {
  return (
    <Grid container>
      <SurveyNameInput />
      <LabelGroup label="분류" xs={12}>
        {data.survey.total_count}개
      </LabelGroup>
      <SurveyInput />

      <Grid
        item
        xs={12}
        sx={{
          mt: 2,
        }}
      >
        <Button type="submit" variant="contained">
          수정
        </Button>

        <Link
          href="/admin/survey"
          style={{
            display: 'inline-block',
            marginLeft: '10px',
          }}
        >
          <Button variant="contained" color="secondary">
            목록
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}

export default SurveyUpdateForm;
