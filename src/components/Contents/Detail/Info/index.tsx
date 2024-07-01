import React from 'react';
import classNames from 'classnames';
import { TagItem } from '@/components/Common/Tag/Tag.styled';
import {
  Layout,
  Description,
  BottomContents,
  TagBox,
  CountBox,
} from '@/components/Contents/Detail/Info/Info.styled';
import { ContentDetailT } from '@/types/content/detail';
import { formatCount } from '@/utils/content/detail';

interface Props {
  content: ContentDetailT;
  isLike: boolean;
}

function DetailInfo({ content, isLike }: Props) {
  return (
    <Layout>
      <Description
        dangerouslySetInnerHTML={{ __html: content.contents || '' }}
      />

      <BottomContents>
        <TagBox>
          {content.tags.slice(0, 3).map(({ id, name }) => (
            <TagItem key={id}>{name}</TagItem>
          ))}
        </TagBox>

        <CountBox>
          <div className="item">
            <span className={classNames('icon', 'like', { active: isLike })} />
            <span className="count">{formatCount(content.like_count)}</span>
          </div>
          <div className="item">
            <span className="icon share" />
            <span className="count">{formatCount(content.share_count)}</span>
          </div>
        </CountBox>
      </BottomContents>
    </Layout>
  );
}

export default DetailInfo;
