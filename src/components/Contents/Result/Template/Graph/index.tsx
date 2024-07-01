import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';

interface Props {
  items: Array<any>;
}

function Graph({ items }: Props) {
  const labels = items.map((f: any) => `${f.name}`);
  const graphData = items.map((f: any) => Number(f.contents));

  const data = {
    labels,
    datasets: [
      {
        data: graphData,
        fill: true,
        backgroundColor: 'rgba(137,134,255,0.12)',
        borderColor: 'rgba(137,134,255,1)',
        borderWidth: 2,
        fontColor: '#ffffff',
      },
    ],
  };

  return (
    <Chart
      type="radar"
      data={data}
      options={{
        layout: {
          padding: 0,
        },
        scales: {
          r: {
            angleLines: {
              display: false,
            },
            suggestedMin: 0,
            pointLabels: {
              padding: 0,
              font: {
                family: '"Pretendard Variable",Pretendard,"Noto Sans KR"',
                size: 15,
                weight: '500',
              },
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  );
}

export default Graph;
