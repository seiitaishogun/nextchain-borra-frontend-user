import React from 'react';
import Link from 'next/link';
import { Box, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import LabelGroup from '@/components/Admin/Common/Form/LabelGroup';
import ExcelDownload from '@/components/Admin/Common/ExcelDownload';
import { ContentT } from '@/types/admin/fortunes';
import { fetchFortunesExcelDownloadDetail } from '@/api/admin/fortunes';

interface Props {
  contents: Array<ContentT>;
}

function LinkedContents({ contents }: Props) {
  const router = useRouter();
  return (
    <Box mt={4}>
      <Typography
        variant="h5"
        component="h2"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>연결된 콘텐츠</div>

        <ExcelDownload
          text="엑셀 다운로드"
          downloadFunction={() =>
            fetchFortunesExcelDownloadDetail(Number(router.query.id))
          }
        />
      </Typography>
      <Grid container mt={2}>
        <LabelGroup label="콘텐츠명" xs={12}>
          {contents.map((c, i) => (
            <Link
              key={c.id}
              href={`/admin/contents/${c.id}`}
              target="_blank"
              style={{
                marginRight: '8px',
              }}
            >
              {c.name}
              {i + 1 !== contents.length ? ',' : ''}
            </Link>
          ))}
        </LabelGroup>
      </Grid>
    </Box>
  );
}

export default LinkedContents;
