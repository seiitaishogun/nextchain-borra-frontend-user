import { Button, Grid, IconButton } from '@mui/material';
import { useState } from 'react';
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from '@mui/icons-material';
import LabelGroup from '@/components/Admin/Common/Form/LabelGroup';
import { Layout } from '@/styles/Admin/Search.styled';

interface Props {
  Top?: React.ReactElement;
  Detail?: React.ReactElement; // 상세 검색
  children?: React.ReactElement;
  handleSearch: () => void;
}

function Template({ Top, Detail, children, handleSearch }: Props) {
  const [show, setShow] = useState(false);

  return (
    <Layout>
      <Grid container spacing={0}>
        {Top}
        {Detail && (
          <>
            <LabelGroup xs={12} useLabel={false}>
              <IconButton aria-label="arrow" onClick={() => setShow(!show)}>
                상세검색
                {show ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </LabelGroup>
            {show && Detail}
          </>
        )}
        {children}
        <Grid
          item
          xs={12}
          sx={{
            padding: '8px 12px',
          }}
        >
          <Button variant="contained" onClick={handleSearch}>
            검색
          </Button>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Template;
