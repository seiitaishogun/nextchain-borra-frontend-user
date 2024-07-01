interface AdvertisesData {
  id: number;
  code: string;
  type: string;
  content_id: number;
  content: any;
  count: number;
  url: string;
  created_at: string;
  updated_at: string;
}

const enum TYPE {
  Pincrux = 'pincrux',
  NBT = 'nbt',
}

const TYPE_OPTIONS = [
  {
    label: 'pincrux',
    value: TYPE.Pincrux,
  },
  {
    label: 'NBT',
    value: TYPE.NBT,
  },
];

export { TYPE, TYPE_OPTIONS };
export type { AdvertisesData };
