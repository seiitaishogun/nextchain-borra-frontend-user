import Summary from '@/components/Contents/Result/Template/Summary';
import Description from '@/components/Contents/Result/Template/Description';
import ScoreSummary from '@/components/Contents/Result/Template/ScoreSummary';
import ScoreItems from '@/components/Contents/Result/Template/ScoreItems';
import Items from '@/components/Contents/Result/Template/Items';
import Graph from '@/components/Contents/Result/Template/Graph';
import FortuneDescription from '@/components/Contents/Result/Template/FortuneDescription';

interface Props {
  data: any;
  subName?: string;
  isChildren?: boolean;
  sign?: string | null;
}

function ContentsTemplate({ data, subName, isChildren, sign }: Props) {
  const { children_data, template } = data;

  /**
   * children 이면서 자식 template 이 같은 경우
   * 아이템, 그래프 같은 특정 템플릿일때 조건
   */
  if (isChildren) {
    switch (template?.id) {
      case 4:
        return <ScoreItems items={children_data} />;
      case 7:
        return <Items items={children_data} />;
      case 8:
        return <Graph items={children_data} />;
      default:
        return (
          <>
            {children_data.map((f: any) => (
              <ContentsTemplate
                key={f.id}
                sign={data.sign}
                data={f}
                subName={data.name !== 'null' ? data.name : ''}
                isChildren={false}
              />
            ))}
          </>
        );
    }
  }

  const { name, summary, contents } = data;

  /**
   * children 이 아닌 경우
   * 기본 출력
   */
  switch (template.id) {
    case 1:
      return <Summary name={name} summary={summary} />;
    case 2:
      return (
        <Description
          subName={subName || ''}
          sign={sign}
          name={name}
          summary={summary}
          contents={contents}
        />
      );
    case 3:
      return <FortuneDescription contents={contents} />;
    case 5:
      return <ScoreSummary name={name} summary={summary} contents={contents} />;
    case 6:
      return <ScoreSummary name={name} contents={contents} />;
    default:
      return null;
  }
}

export default ContentsTemplate;
