import { Button, Result } from 'antd';
import React from 'react';
import { Link } from 'umi';

/**
 * 词库添加成功页面
 * @constructor
 */
const DictAddResultPage: React.FC = () => (
  <Result
    status="success"
    title="词库创建成功"
    subTitle="该词库已经保存成功, 下次登录可以立即使用"
    extra={[
      <Link key="use" to="/">
        <Button type="primary">去使用</Button>
      </Link>,
      <Link key="add" to="/dict/add">
        <Button> 再创建一个</Button>
      </Link>,
    ]}
  />
);

export default DictAddResultPage;
