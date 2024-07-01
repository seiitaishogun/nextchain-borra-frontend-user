import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTypes } from '@/api/admin/common';
import { Tag as ApiTag } from '@/types/tags';

interface Tag {
  label: string;
  text?: string;
  value: string;
}

function useTypes() {
  const [tags, setTags] = useState<Array<Tag>>([]);
  const { data, isSuccess } = useQuery(['adminTypes'], fetchTypes);

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

export default useTypes;
