import React, { useRef, useState } from 'react';
import { Button } from '@mui/material';
import { useDrag, useDrop } from 'react-dnd';
import LabelGroup from '@/components/Admin/Common/Form/LabelGroup';
import TextField from '@/components/Admin/Common/Form/TextField';
import {
  ChildIconRender,
  ChildrenLayout,
  UtilWrap,
} from '@/components/Admin/Contents/Fortunes/Fortunes.styled';
import ModalChildren from '@/components/Admin/Contents/Fortunes/Modal/Children';
import Radio from '@/components/Admin/Common/Form/Radio';
import Select from '@/components/Admin/Common/Form/Select';
import { IS_SHOW_OPTIONS } from '@/constants/admin/fortunes';
import {
  ChildrenT,
  ChildrenDataT,
  ParentT,
} from '@/types/admin/contents/contents';

interface Props {
  parent: ParentT;
  originChildren: ChildrenT;
  childrenData: Array<ChildrenDataT>;
  setParentList: React.Dispatch<React.SetStateAction<Array<ParentT>>>;
  handleMoveChild: (dragOrder: number, hoverOrder: number) => void;
  handleRemoveChildren: (children: ChildrenT) => void;
  handleComplete: (selectFortunes: Array<ChildrenDataT>) => void;
}

interface XYCoord {
  x: number;
  y: number;
}

function Children({
  originChildren,
  handleRemoveChildren,
  handleMoveChild,
  handleComplete,
  childrenData,
  parent,
  setParentList,
}: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag({
    type: 'child',
    item: { order: originChildren.order },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, drop] = useDrop({
    accept: 'child',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover: (item: any, monitor) => {
      if (!ref.current) return;

      const dragOrder = item.order;
      const hoverOrder = originChildren.order;
      if (dragOrder === hoverOrder) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragOrder < hoverOrder && hoverClientY < hoverMiddleY) return;
      if (dragOrder > hoverOrder && hoverClientY > hoverMiddleY) return;

      handleMoveChild(dragOrder, hoverOrder);
      // eslint-disable-next-line no-param-reassign
      item.order = hoverOrder;
    },
  });

  const handleChildrenSearch = () => {
    setModalOpen(true);
  };

  const handleUpdateParentItem = ({
    parentOrder,
    childOrder,
    key,
    value,
  }: {
    parentOrder: number;
    childOrder: number;
    key: 'name' | 'is_open' | 'sign';
    value: string | boolean | number | any;
  }) => {
    setParentList(prev => {
      const newParents = [...prev];
      newParents[parentOrder].children[childOrder][key] = value as never;
      return newParents;
    });
  };

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const icons = Array.from({ length: 14 }, (_, i) => i + 1).map(i => ({
    label: (
      <ChildIconRender
        image={`${process.env.APP_IMAGE_URL}/contents/icons/${i}.svg`}
      />
    ),
    value: i,
  }));

  return (
    <ChildrenLayout
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
          checked={originChildren?.is_open}
          onChange={e => {
            const { value } = e.target;
            handleUpdateParentItem({
              parentOrder: parent?.order,
              childOrder: originChildren?.order,
              key: 'is_open',
              value: Number(value),
            });
          }}
        />
        <Button
          variant="outlined"
          onClick={() => handleRemoveChildren(originChildren)}
        >
          삭제
        </Button>
      </UtilWrap>

      <LabelGroup label="소제목" id="title" xs={12}>
        <Select
          options={icons}
          minWidth={70}
          selected={originChildren.sign || ''}
          defaultConfig={{
            text: '없음',
            value: '',
          }}
          onChange={e => {
            handleUpdateParentItem({
              parentOrder: parent?.order,
              childOrder: originChildren?.order,
              key: 'sign',
              value: e.target.value || null,
            });
          }}
        />

        <TextField
          fullWidth
          name="name"
          placeholder="소제목"
          value={originChildren.name}
          onChange={e => {
            const { value } = e.target;
            handleUpdateParentItem({
              parentOrder: parent?.order,
              childOrder: originChildren?.order,
              key: 'name',
              value,
            });
          }}
        />
      </LabelGroup>

      <LabelGroup label="데이터 추가/수정" id="childrenFortuneData" xs={12}>
        <span>{childrenData?.length} 개</span>
        <Button variant="outlined" onClick={handleChildrenSearch}>
          조회/검색
        </Button>
      </LabelGroup>

      {modalOpen && (
        <ModalChildren
          open={modalOpen}
          setModalOpen={setModalOpen}
          handleComplete={selectChildrenData => {
            handleComplete(selectChildrenData);
            setModalOpen(false);
          }}
          fortunes={childrenData}
        />
      )}
    </ChildrenLayout>
  );
}

export default Children;
