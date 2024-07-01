enum ContentsTypeE {
  Saju = 'saju',
  Juyeog = 'juyeog',
  Tarot = 'tarot',
  Today = 'today',
  Zodiac = 'zodiac',
  Constellation = 'constellation',
  Jamidusu = 'jamidusu',
}

enum ContentSiteE {
  BORRA = 'borra',
  GUNGTA = 'gungta',
  NHPAY = 'nhpay',
  JK = 'jk',
}

interface OriginContentResultDataT {
  parents: Array<any>;
  children: Array<any>;
  children_data: Array<any>;
  content: any;
  purchase: any;
  daeun: any;
}

export { ContentsTypeE, ContentSiteE };
export type { OriginContentResultDataT };
