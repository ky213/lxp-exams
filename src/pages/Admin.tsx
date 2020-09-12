import React, { useState } from 'react';
import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import { Card } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';

export default (): React.ReactNode => {
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  return (
    <PageContainer>
      <Card>
        <h1>admin</h1>
      </Card>
    </PageContainer>
  );
};
