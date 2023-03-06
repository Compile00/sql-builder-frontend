import FieldInfoCard from '@/components/FieldInfoCard';
import { listMyAddFieldInfoByPage } from '@/services/fieldInfoService';
import { PageContainer } from '@ant-design/pro-components';
import { Col, message, Row } from 'antd';
import React from 'react';
import './index.less';

/**
 * 字段信息页
 *
 *
 */
const FieldInfoPage: React.FC = () => {
  /**
   * 加载我的数据
   * @param searchParams
   * @param setDataList
   * @param setTotal
   */
  const loadMyData = (
    searchParams: FieldInfoType.FieldInfoQueryRequest,
    setDataList: (dataList: FieldInfoType.FieldInfo[]) => void,
    setTotal: (total: number) => void,
  ) => {
    listMyAddFieldInfoByPage(searchParams)
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
    <div className="field-info">
      <PageContainer
        title={
          <>
           保存字段设计，高效完成建表！
          </>
        }
      >
        <Row gutter={[12, 12]}>
          <Col
            xs={24}
            xl = {24}
          >
            <FieldInfoCard title="个人保存字段" onLoad={loadMyData} needLogin />
          </Col>
        </Row>
      </PageContainer>
    </div>
  );
};

export default FieldInfoPage;
