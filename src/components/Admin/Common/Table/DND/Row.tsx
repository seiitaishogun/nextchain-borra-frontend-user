import React, { useRef } from 'react';
import { TableCell, TableRow } from '@mui/material';
import { useDrag, useDrop } from 'react-dnd';

interface XYCoord {
  x: number;
  y: number;
}

function Row({ row, columns, handleMoveFortune }: any) {
  const ref = useRef<any>(null);
  const [{ isDragging }, drag] = useDrag({
    type: 'fortune',
    item: { order: row.order },
    canDrag: () => true,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, drop] = useDrop({
    accept: 'fortune',
    canDrop: () => true,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover: (item: any, monitor) => {
      if (!ref.current) return;

      const dragOrder = item.order;
      const hoverOrder = row.order;
      if (dragOrder === hoverOrder) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragOrder < hoverOrder && hoverClientY < hoverMiddleY) return;
      if (dragOrder > hoverOrder && hoverClientY > hoverMiddleY) return;

      handleMoveFortune(dragOrder, hoverOrder);
      // eslint-disable-next-line no-param-reassign
      item.order = hoverOrder;
    },
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <TableRow
      key={row.id}
      ref={ref}
      data-handler-id={handlerId}
      style={{
        cursor: 'move',
        opacity,
      }}
    >
      {columns.map((column: any) => (
        <TableCell key={column.id} align="center" onClick={column.onClick}>
          {column.format ? column.format(row) : row[column.id]}
        </TableCell>
      ))}
    </TableRow>
  );
}

export default Row;
