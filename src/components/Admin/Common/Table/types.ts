import React from 'react';

const enum OrderDirectionE {
  ASC = 'asc',
  DESC = 'desc',
}

interface OrderT {
  order_column: string;
  order_direction: OrderDirectionE;
}

interface TableColumns<T> {
  id: string;
  label: string;
  maxWidth?: number;
  link?: {
    href: string;
    isExternal?: boolean;
    params?: object;
  };
  isSort?: boolean;
  orderColumn?: string;
  format?: (data: T) => any;
  onClick?: React.MouseEventHandler<HTMLTableCellElement>;
}

export { OrderDirectionE };
export type { TableColumns, OrderT };
