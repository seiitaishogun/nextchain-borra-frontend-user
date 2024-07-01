const enum DateType {
  CreatedAt = 'created_at',
  UpdatedAt = 'updated_at',
}

interface ContentT {
  content_id?: number;
  id: number;
  name: string;
  parent_id?: number;
}

interface CreateT {
  conditions: Array<ConditionsT>;
  templates: Array<{
    id: number;
    name: string;
  }>;
  types: Array<{
    id: number;
    name: string;
  }>;
}

interface ConditionsT {
  condition_type_id: number;
  id: number;
  major?: string;
  minor?: string;
  name?: string;
  type_id: number | null;
}

const enum StatusE {
  Normal = 0,
  Partner = 1,
  Couple = 2,
  Card = 3,
  CardStraight = 4,
}

export { DateType, StatusE };
export type { ContentT, ConditionsT, CreateT };
