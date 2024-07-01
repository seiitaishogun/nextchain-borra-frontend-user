import React from 'react';
import styled from 'styled-components';
import { Grid } from '@mui/material';
import LabelGroup from '@/components/Admin/Common/Form/LabelGroup';
import { FeedbackT } from '@/types/content/feedback';

interface Props {
  feedback: FeedbackT[];
}

const Layout = styled.div`
  margin-top: 50px;
`;

function ContentFeedback({ feedback }: Props) {
  return (
    <Layout>
      <h1>피드백 통계</h1>

      <Grid container spacing={0}>
        {feedback.map(f => (
          <LabelGroup key={f.id} label={f.name} xs={2}>
            {f.count}
          </LabelGroup>
        ))}
      </Grid>
    </Layout>
  );
}

export default ContentFeedback;
