import React from 'react';
import { Button, Grid } from '@mui/material';
import Link from 'next/link';
import SurveyInput from '@/components/Admin/Survey/Form/SurveyInput';
import SurveyNameInput from '@/components/Admin/Survey/Form/SurveyNameInput';
import SurveyTotalCountInput from '@/components/Admin/Survey/Form/SurveyTotalCountInput';

function SurveyCreateForm() {
  return (
    <Grid container>
      <SurveyNameInput />
      <SurveyTotalCountInput />
      <SurveyInput />

      <Grid
        item
        xs={12}
        sx={{
          mt: 2,
        }}
      >
        <Button type="submit" variant="contained">
          등록
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

export default SurveyCreateForm;
