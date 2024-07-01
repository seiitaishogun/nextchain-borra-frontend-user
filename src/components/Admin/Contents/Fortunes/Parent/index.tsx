import React, { useRef } from 'react';
import { Button } from '@mui/material';
import { useDrag, useDrop } from 'react-dnd';
import {
  ParentLayout,
  UtilWrap,
} from '@/components/Admin/Contents/Fortunes/Fortunes.styled';
import LabelGroup from '@/components/Admin/Common/Form/LabelGroup';
import TextField from '@/components/Admin/Common/Form/TextField';
import Children from '@/components/Admin/Contents/Fortunes/Children';
import Radio from '@/components/Admin/Common/Form/Radio';
import { IS_SHOW_OPTIONS } from '@/constants/admin/fortunes';
import { ChildrenDataT, ParentT } from '@/types/admin/contents/contents';

interface Props {
  parent: ParentT;
  setParentList: React.Dispatch<React.SetStateAction<Array<ParentT>>>;
  handleMoveParent: (dragOrder: number, hoverOrder: number) => void;
  handleRemoveParent: (parent: ParentT) => void;
  handleAddChildren: ({ parentOrder }: { parentOrder: number }) => void;
  handleRemoveChildren: ({
    parentOrder,
    childOrder,
  }: {
    parentOrder: number;
    childOrder: number;
  }) => void;
  handleMoveChild: ({
    parentOrder,
    dragOrder,
    hoverOrder,
  }: {
    parentOrder: number;
    dragOrder: number;
    hoverOrder: number;
  }) => void;
  handleComplete: ({
    parentOrder,
    childOrder,
    childrenData,
  }: {
    parentOrder: number;
    childOrder: number;
    childrenData: Array<ChildrenDataT>;
  }) => void;
}

interface XYCoord {
  x: number;
  y: number;
}

function Parent({
  parent,
  setParentList,
  handleMoveParent,
  handleRemoveParent,
  handleAddChildren,
  handleRemoveChildren,
  handleMoveChild,
  handleComplete,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag({
    type: 'parent',
    item: { order: parent.order },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, drop] = useDrop({
    accept: 'parent',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover: (item: any, monitor) => {
      if (!ref.current) return;

      const dragOrder = item.order;
      const hoverOrder = parent.order;
      if (dragOrder === hoverOrder) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragOrder < hoverOrder && hoverClientY < hoverMiddleY) return;
      if (dragOrder > hoverOrder && hoverClientY > hoverMiddleY) return;

      handleMoveParent(dragOrder, hoverOrder);
      // eslint-disable-next-line no-param-reassign
      item.order = hoverOrder;
    },
  });

  const handleUpdateParentItem = ({
    parentOrder,
    key,
    value,
  }: {
    parentOrder: number;
    key: 'name' | 'is_open';
    value: string | boolean | number;
  }) => {
    setParentList(prev => {
      const newParents = [...prev];
      newParents[parentOrder][key] = value as never;
      return newParents;
    });
  };

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <ParentLayout
      ref={ref}
      data-handler-id={handlerId}
      style={{
        border: '1px dashed gray',
        padding: '0.5rem 1rem',
        marginBottom: '.5rem',
        backgroundColor: 'white',
        cursor: 'move',
        opacity,
      }}
    >
      <UtilWrap>
        <Radio
          labels={IS_SHOW_OPTIONS}
          checked={parent?.is_open}
          onChange={e => {
            const { value } = e.target;
            handleUpdateParentItem({
              parentOrder: parent?.order,
              key: 'is_open',
              value: Number(value),
            });
          }}
        />
        <Button variant="outlined" onClick={() => handleRemoveParent(parent)}>
          삭제
        </Button>
      </UtilWrap>
      <LabelGroup label="페이지명" id="name" xs={12}>
        <TextField
          fullWidth
          name="name"
          placeholder="페이지명"
          value={parent?.name || ''}
          onChange={e => {
            const { value } = e.target;
            handleUpdateParentItem({
              parentOrder: parent?.order,
              key: 'name',
              value,
            });
          }}
        />
      </LabelGroup>
      {parent.children.map(c => (
        <Children
          originChildren={c}
          childrenData={c.children_data}
          parent={parent}
          setParentList={setParentList}
          handleMoveChild={(dragOrder: number, hoverOrder: number) => {
            handleMoveChild({
              parentOrder: parent.order,
              dragOrder,
              hoverOrder,
            });
          }}
          handleRemoveChildren={() =>
            handleRemoveChildren({
              parentOrder: parent.order,
              childOrder: c.order,
            })
          }
          handleComplete={fortunes =>
            handleComplete({
              parentOrder: parent.order,
              childOrder: c.order,
              childrenData: fortunes,
            })
          }
        />
      ))}

      <Button
        variant="outlined"
        onClick={() => {
          handleAddChildren({
            parentOrder: parent.order,
          });
        }}
      >
        + 소제목 추가
      </Button>
    </ParentLayout>
  );
}

export default Parent;
