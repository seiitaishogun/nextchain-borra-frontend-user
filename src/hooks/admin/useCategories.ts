import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '@/api/admin/common';
import { Tag as ApiTag } from '@/types/tags';

interface Tag {
  label: string;
  text?: string;
  value: string;
}

function useCategories() {
  const [tags, setTags] = useState<Array<Tag>>([]);
  const { data, isSuccess } = useQuery(['adminCategories'], fetchCategories);

  useEffect(() => {
    if (isSuccess) {
      const newTags = data.data.map(({ id, name }: ApiTag) => ({
        label: name,
        value: id.toString(),
      }));
      setTags(newTags);
    }
  }, [isSuccess]);

  return tags;
}

export default useCategories;
