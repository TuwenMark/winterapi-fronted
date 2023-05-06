import {PageContainer,} from '@ant-design/pro-components';
import '@umijs/max';
import React, {useEffect, useState} from 'react';
import ReactECharts from 'echarts-for-react';
import {listTopInterfaceInvokeUsingGET} from "@/services/winterapi-backend/analysisController";

const InterfaceAnalysis: React.FC = () => {
  const [data, setData] = useState<API.InterfaceInvokeVO[]>([]);
  const [loading, setLoading] = useState(false);

  // 从远程一次性获取数据
  useEffect(() => {
    try {
      const topN = 3;
      listTopInterfaceInvokeUsingGET({
        topN: topN,
      }).then(res => {
        if (res.data) {
          setData(res.data)
        }
      })
    } catch (e: any) {
      // setLoading(false);
    }
  }, [])

  // 映射：{ value: 1048, name: 'Search Engine' },

  const chartData = data.map(item => {
    return{
      value: item.totalNum,
      name: item.interfaceName,
    }
  })

  const option = {
    title: {
      text: 'Interface Invoke Analysis',
      subtext: 'Top 3',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: chartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };


  return (
    <PageContainer>
      <ReactECharts
        option={option}
        showLoading={loading}
      />
    </PageContainer>
  );
};
export default InterfaceAnalysis;
