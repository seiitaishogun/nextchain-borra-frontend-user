type CardSize = 'small' | 'medium' | 'large';

interface CardProps {
  isLoading?: boolean;
  data?: Array<any>;
  size?: CardSize;
  isSwipe?: boolean;
  emptyMessage?: string;
  isPurchaseLink?: boolean;
  useLike?: boolean;
}

interface DataProps {
  id: number;
  name: string;
  view_count: number;
  thumbnail: string | null;
  content_id?: number;
  isLike?: boolean;
}

interface CardItemProps {
  data: DataProps;
  size: CardSize;
  isLike?: boolean;
  getLink: ({ id, purchaseId }: { id: number; purchaseId?: number }) => string;
}

export type { CardSize, CardProps, DataProps, CardItemProps };
