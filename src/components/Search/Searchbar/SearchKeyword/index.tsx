import { Modal } from '@mui/material';
import { AccessTime } from '@mui/icons-material';
import Link from 'next/link';
import {
  Layout,
  Best,
} from '@/components/Search/Searchbar/SearchKeyword/SearchKeyword.styled';
import useKeywords from '@/hooks/search/useKeywords';

interface Props {
  historyKeywords: Array<string>;
  autoKeywords: Array<string>;
  isOpen: boolean;
  onSearch: (value: string) => void;
  onClose: () => void;
  onDelete: (value: string) => void;
}

function SearchKeyword({
  historyKeywords,
  autoKeywords,
  isOpen,
  onSearch,
  onClose,
  onDelete,
}: Props) {
  const bestKeywords = useKeywords();

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{
        zIndex: 9, // 헤더 z-index 보다 아래로 위치
      }}
    >
      <Layout>
        <ul>
          {bestKeywords.length > 0 && (
            <li>
              <span className="item">
                <Link
                  href="/"
                  passHref
                  onClick={e => {
                    e.preventDefault();
                    onSearch(bestKeywords[0]);
                  }}
                >
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}

                  <Best>
                    <span className="label">추천</span>
                    <span> {bestKeywords[0]}</span>
                  </Best>
                </Link>
              </span>
            </li>
          )}

          {historyKeywords.map(search_value => (
            <li key={search_value}>
              <span className="item">
                <AccessTime sx={{ fontSize: '12px' }} />
                <Link
                  href="/"
                  passHref
                  onClick={e => {
                    e.preventDefault();
                    onSearch(search_value);
                  }}
                >
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}

                  {search_value}
                </Link>
              </span>
              <button
                className="del"
                type="button"
                onClick={() => onDelete(search_value)}
              >
                <span className="icon" />
              </button>
            </li>
          ))}

          {autoKeywords.map(search_value => (
            <li key={search_value}>
              <span className="item">
                <Link
                  href="/"
                  passHref
                  onClick={e => {
                    e.preventDefault();
                    onSearch(search_value);
                  }}
                >
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}

                  {search_value}
                </Link>
              </span>
            </li>
          ))}
        </ul>
      </Layout>
    </Modal>
  );
}

export default SearchKeyword;
