import React from 'react';
import classNames from 'classnames';
import TopBanner from '@/components/Contents/TopBanner';
import {
  Layout as InfoLayout,
  BottomContents,
  CountBox,
  Description,
  TagBox,
} from '@/components/Contents/Detail/Info/Info.styled';
import { TagItem } from '@/components/Common/Tag/Tag.styled';
import { formatCount } from '@/utils/content/detail';
import { CounselorDetailT } from '@/types/counselor/detail';

interface Props {
  data: CounselorDetailT;
  isLike: boolean;
}

function CounselorHeader({ data, isLike }: Props) {
  return (
    <div>
      <TopBanner bg={data.banner || data.image} />

      <InfoLayout>
        <Description dangerouslySetInnerHTML={{ __html: data.content }} />

        <BottomContents>
          <TagBox>
            {!!data.is_sinjeom && <TagItem>신점</TagItem>}
            {!!data.is_yeoghag && <TagItem>역학</TagItem>}
            {!!data.is_tarot && <TagItem>타로</TagItem>}
            {!!data.is_free && <TagItem>5분 무료</TagItem>}
          </TagBox>

          <CountBox>
            <div className="item">
              <span
                className={classNames('icon', 'like', { active: isLike })}
              />
              <span className="count">{formatCount(data.like_count)}</span>
            </div>
          </CountBox>
        </BottomContents>
      </InfoLayout>
    </div>
  );
}

export default CounselorHeader;
