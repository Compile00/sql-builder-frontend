import DictCard from '@/components/DictCard';
import { listMyDictByPage } from '@/services/dictService';
import { PageContainer } from '@ant-design/pro-components';
import { Col, message, Row } from 'antd';
import React from 'react';
import './index.less';

/**
 * 主页
 *
 * @constructor
 */
const IndexPage: React.FC = () => {

  /**
   * 加载我的数据
   * @param searchParams
   * @param setDataList
   * @param setTotal
   */
  const loadMyData = (
    searchParams: DictType.DictQueryRequest,
    setDataList: (dataList: DictType.Dict[]) => void,
    setTotal: (total: number) => void,
  ) => {
    listMyDictByPage(searchParams)
      .then((res) => {
        setDataList(res.data.records);
        setTotal(res.data.total);
      })
      .catch((e) => {
        message.error('加载失败，' + e.message);
      });
  };

  /**
   * 更改布局
   * @param e
   */

  return (
    <div id="indexPage">
      <PageContainer
        title={
          <>
            使用现成的词库来生成特定数据!
          </>
        }
      >
        <Row gutter={[12, 12]}>
          <Col
            xs={24}
            xl={24}
          >
            <DictCard title="个人词库" onLoad={loadMyData} needLogin />
          </Col>
        </Row>
      </PageContainer>
    </div>
  );
};

export default IndexPage;
