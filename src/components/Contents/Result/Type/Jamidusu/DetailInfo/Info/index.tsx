import React, { Dispatch, SetStateAction } from 'react';
import SwiperTabs from '@/components/Contents/Result/Type/Zodiac/SwiperTabs';

interface Props {
  title: string;
  tabs: Array<string>;
  tabIndex: number;
  setTabIndex: Dispatch<SetStateAction<number>>;
  data: Array<{ name: string; content: string }>;
}

function Info({ title, tabs, tabIndex, setTabIndex, data }: Props) {
  return (
    <div>
      <h2>{title}</h2>
      <SwiperTabs
        tabs={tabs}
        selectedTabIndex={tabIndex}
        handleClick={i => {
          setTabIndex(i % tabs.length);
        }}
        getIconImg={() => ''}
      />
      <div className="description">
        {data
          .filter(s => s.name === tabs[tabIndex])
          .map(s => (
            <p key={s.name}>{s.content}</p>
          ))}
      </div>
    </div>
  );
}

export default Info;
