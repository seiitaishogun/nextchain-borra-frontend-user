import Item, { Menu } from '@/components/Admin/Layout/Aside/Item';

interface Props {
  data: Array<Menu>;
}

function Items({ data }: Props) {
  return (
    <>
      {data.map(d => (
        <Item key={d.id} data={d} />
      ))}
    </>
  );
}

export default Items;
