import React from 'react';
import Link from 'next/link';
import Thumbnail from '@/components/Common/List/Common/Thumbnail';
import {
  InfoStatusBox,
  InfoStatusLikeIcon,
  InfoStatusViewIcon,
  InfoSummary,
  InfoTitle,
} from '@/components/Common/List/DetailList/DetailList.styled';
import CounselorState from '@/components/Counselor/List/State';
import {
  Card,
  Info,
} from '@/components/Counselor/List/ListItem/ListItem.styled';
import { numberWithCommas } from '@/utils/number';
import { CounselorListT } from '@/types/counselor/list';

interface Props {
  counselor: CounselorListT;
}

function ListItem({ counselor }: Props) {
  const {
    id,
    name,
    like_count,
    image,
    thumbnail,
    state,
    summary,
    view_count,
    is_free,
  } = counselor;
  return (
    <Card key={id}>
      <Link className="card-link" href={`/counselor/${id}`}>
        <Thumbnail image={thumbnail || image} size={100} />

        <Info>
          <div>
            <InfoTitle>{name}</InfoTitle>
            {summary && <InfoSummary>{summary}</InfoSummary>}

            <InfoStatusBox>
              <InfoStatusLikeIcon>
                {numberWithCommas(like_count || 0)}
              </InfoStatusLikeIcon>
              <InfoStatusViewIcon>
                {numberWithCommas(view_count || 0)}
              </InfoStatusViewIcon>
            </InfoStatusBox>
          </div>

          <CounselorState state={state} is_free={!!is_free} />
        </Info>
      </Link>
    </Card>
  );
}

export default ListItem;
