import { useEffect } from 'react';
import { ParentT } from '@/types/admin/contents/contents';

enum DefaultTypeId {
  Tarot = 3,
  ZODIAC = 4,
  CONSTELLATION = 5,
}

function useDefaultParentListByTypeId({
  parentList,
  setParentList,
  flag,
  typeId,
}: {
  parentList: Array<ParentT>;
  setParentList: React.Dispatch<Array<ParentT>>;
  flag: boolean;
  typeId: number;
}) {
  useEffect(() => {
    if (!flag) return; // 콘텐츠 조회 첫 렌더는 패치한 운세 풀이 데이터 유지

    // type_id 변경시 소제목이 있는 운세 풀이 데이터만 유지
    // TODO type_id 변경시 소제목이 없는 데이터는 삭제된다는 alert 메세지 있으면 좋을 것 같음
    const newParentList = parentList.filter(parent => parent?.children?.length);
    setParentList(newParentList);

    // parentList가 값이 없을 경우 type_id에 맞춰 default 값 할당
    if (!newParentList.length && typeId in DefaultTypeId) {
      const parentsData = DefaultParentList[typeId];
      setParentList(parentsData);
    }
  }, [typeId]);
}

export default useDefaultParentListByTypeId;
export type { DefaultTypeId };

const DefaultParentList: Record<any, Array<any>> = {
  [DefaultTypeId.ZODIAC]: [
    '쥐띠',
    '소띠',
    '호랑이띠',
    '토끼띠',
    '용띠',
    '뱀띠',
    '말띠',
    '양띠',
    '원숭이띠',
    '닭띠',
    '개띠',
    '돼지띠',
  ].map((name, i) => ({
    id: null,
    name,
    order: i,
    children: [],
    is_open: 1,
  })),
  [DefaultTypeId.CONSTELLATION]: [
    '양자리',
    '황소자리',
    '쌍둥이자리',
    '게자리',
    '사자자리',
    '처녀자리',
    '천칭자리',
    '전갈자리',
    '사수자리',
    '염소자리',
    '물병자리',
    '물고기자리',
  ].map((name, i) => ({
    id: null,
    name,
    order: i,
    children: [],
    is_open: 1,
  })),
  // FIXME 하드코딩 개선
  [DefaultTypeId.Tarot]: [1, 2].map((name, i) => ({
    id: null,
    name: `${name}번째 카드`,
    order: i,
    children: [],
    is_open: 1,
  })),
};
