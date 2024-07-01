import styled from 'styled-components';
import classNames from 'classnames';
import { TagItem } from '@/components/Contents/Result/Type/Zodiac/Zodiac.styled';

interface Props {
  tags: Array<any>;
  selectedTabIndex: number;
  handleClick: (i: number) => void;
  getIconImg: (num: number) => string | null;
}

const Layout = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-top: 8px;

  .tag {
    height: 33px;
    margin-top: 8px;
    margin-right: 12px;
  }
`;

function Tag({ tags, selectedTabIndex, handleClick, getIconImg }: Props) {
  return (
    <Layout>
      {tags.length > 0 &&
        tags.map((tag, i) => (
          <li key={tag + i} className="tag">
            <TagItem
              type="button"
              iconImg={getIconImg(i + 1)}
              className={classNames('tag-item', {
                selected: i === selectedTabIndex,
              })}
              onClick={() => handleClick(i)}
            >
              {tag}
            </TagItem>
          </li>
        ))}
    </Layout>
  );
}

export default Tag;
