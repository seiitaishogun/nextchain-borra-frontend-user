import { ContentsTypeE } from '@/types/content';
import { ReferrerPathE } from '@/types/users';

interface ContentTypeT {
  id: number;
  name: ContentsTypeE;
  description: string;
  is_skip: boolean;
}

interface ContentTagT {
  id: number;
  name: string;
}

interface ContentTarotT {
  name: string;
  is_straight: boolean;
}

interface ContentDetailT {
  id: number;
  category: string | null;
  type: ContentTypeT;
  tags: ContentTagT[];
  thumbnail: string | null;
  banner: string | null;
  name: string;
  summary: string;
  contents: string;
  price: number;
  discount_price: number;
  is_discount: boolean;
  like_count: number;
  share_count: number;
  is_skip: boolean;
  is_partner: boolean;
  is_first_free: boolean;
  is_first_free_used: boolean;
  is_survey: boolean;
  wait_free_time: number;
  user_wait_free_time: string;
  tarot: ContentTarotT[];
  tarot_count: number;
  purchases_flat: string[];
  site?: ReferrerPathE | null;
}

/**
 * 컨텐츠 상세 정보 API Response
 */
interface ContentShowRequest {
  id: number;
}

/**
 * 컨텐츠 상세 정보 API Response
 */

interface ResponseData extends Omit<ContentDetailT, 'user_wait_free_time'> {
  user_wait_free_time: string | null;
}

interface ContentShowResponse {
  data: ResponseData;
}

export type {
  ContentTypeT,
  ContentTarotT,
  ContentDetailT,
  ContentShowRequest,
  ContentShowResponse,
};
