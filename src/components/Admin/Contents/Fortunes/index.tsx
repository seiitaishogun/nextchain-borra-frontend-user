import React, { useCallback } from 'react';
import { Button } from '@mui/material';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Layout } from '@/components/Admin/Contents/Fortunes/Fortunes.styled';
import Parent from '@/components/Admin/Contents/Fortunes/Parent';
import { ChildrenDataT, ParentT } from '@/types/admin/contents/contents';

interface Props {
  parentList: Array<ParentT>;
  setParentList: React.Dispatch<React.SetStateAction<Array<ParentT>>>;
}

function Fortunes({ parentList, setParentList }: Props) {
  const handleAddParent = () => {
    setParentList(prev => [
      ...prev,
      {
        id: null,
        name: '',
        order: prev.length,
        children: [],
        is_open: 1,
      },
    ]);
  };

  const handleRemoveParent = (row: any) => {
    const check = window.confirm(
      '해당 영역을 삭제하시겠습니까? 연결된 데이터는 모두 연결 해제 됩니다.'
    );
    if (check) {
      const newParentList = [...parentList]
        .filter(p => p.order !== row.order)
        .map((p, i) => ({ ...p, order: i }));
      setParentList(newParentList);
    }
  };

  const handleAddChildren = ({ parentOrder }: { parentOrder: number }) => {
    const newParentList: Array<ParentT> = [...parentList];
    newParentList[parentOrder].children = [
      ...newParentList[parentOrder].children,
      {
        id: null,
        name: '',
        count: 0,
        sign: null,
        order: newParentList[parentOrder].children.length,
        parent_id: newParentList[parentOrder].id!,
        children_data: [],
        is_open: 1,
      },
    ];
    setParentList(newParentList);
  };

  const handleRemoveChildren = ({
    parentOrder,
    childOrder,
  }: {
    parentOrder: number;
    childOrder: number;
  }) => {
    const newParentList = [...parentList];
    newParentList[parentOrder].children = newParentList[parentOrder].children
      .filter(n => n.order !== childOrder)
      .map((c, i) => ({
        ...c,
        order: i,
      }));
    setParentList(newParentList);
  };

  const handleComplete = ({
    parentOrder,
    childOrder,
    childrenData,
  }: {
    parentOrder: number;
    childOrder: number;
    childrenData: Array<ChildrenDataT>;
  }) => {
    const newParentList = [...parentList];
    newParentList[parentOrder].children[childOrder].children_data =
      childrenData;
    setParentList(newParentList);
  };

  const handleMoveParent = useCallback(
    (dragOrder: number, hoverOrder: number) => {
      setParentList(prev => {
        const newParentList = [...prev];
        [newParentList[dragOrder], newParentList[hoverOrder]] = [
          newParentList[hoverOrder],
          newParentList[dragOrder],
        ];
        return newParentList.map((p, i) => ({ ...p, order: i }));
      });
    },
    []
  );

  const handleMoveChild = useCallback(
    ({
      parentOrder,
      dragOrder,
      hoverOrder,
    }: {
      parentOrder: number;
      dragOrder: number;
      hoverOrder: number;
    }) => {
      setParentList(prev => {
        const newParentList = [...prev];
        [
          newParentList[parentOrder].children[dragOrder],
          newParentList[parentOrder].children[hoverOrder],
        ] = [
          newParentList[parentOrder].children[hoverOrder],
          newParentList[parentOrder].children[dragOrder],
        ];
        newParentList[parentOrder].children = newParentList[
          parentOrder
        ].children.map((c, i) => ({
          ...c,
          order: i,
        }));
        return [...newParentList];
      });
    },
    []
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <Layout>
        <h1>운세 풀이 데이터</h1>
        {parentList.map(p => (
          <Parent
            parent={p}
            setParentList={setParentList}
            handleMoveParent={handleMoveParent}
            handleRemoveParent={handleRemoveParent}
            handleAddChildren={handleAddChildren}
            handleRemoveChildren={handleRemoveChildren}
            handleMoveChild={handleMoveChild}
            handleComplete={handleComplete}
          />
        ))}
        <Button variant="outlined" onClick={handleAddParent}>
          + 페이지 추가
        </Button>
      </Layout>
    </DndProvider>
  );
}

export default Fortunes;
