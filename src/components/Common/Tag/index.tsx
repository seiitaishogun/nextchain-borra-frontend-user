import classNames from 'classnames';
import { TagList, TagItem } from '@/components/Common/Tag/Tag.styled';
import useTags from '@/hooks/useTags';

interface Props {
  selectedTag: Array<string>;
  onClick: (tagId: string) => void;
}

function Tag({ selectedTag, onClick }: Props) {
  const tags = useTags();
  return (
    <TagList>
      {tags.length > 0 &&
        tags.map(({ label, value }) => (
          <TagItem
            key={value}
            className={classNames({
              selected: selectedTag.includes(value),
            })}
          >
            <button type="button" onClick={() => onClick(value)}>
              {label}
            </button>
          </TagItem>
        ))}
    </TagList>
  );
}

export default Tag;
