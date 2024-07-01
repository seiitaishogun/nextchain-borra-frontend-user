import { useState } from 'react';
import { Layout } from '@/components/Faqs/List/List.styled';

interface Props {
  data?: any;
}

function List({ data }: Props) {
  const [isActive, setIsActive] = useState(false);

  const { type, name, contents } = data;

  return (
    <Layout type="button" onClick={() => setIsActive(!isActive)}>
      <div className={isActive ? 'header active' : 'header'}>
        <span>{type}</span>
        <p>{name}</p>
      </div>
      {isActive && (
        <div
          className="contents"
          dangerouslySetInnerHTML={{ __html: contents }}
        />
      )}
    </Layout>
  );
}

export default List;
