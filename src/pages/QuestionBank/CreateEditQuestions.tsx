import React, { useEffect } from 'react';
import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import { Card, Typography, Alert } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import SurveyCreator from './SurveyCreator';

export default (): React.ReactNode => {
  return (
    <PageContainer>
      <SurveyCreator />
    </PageContainer>
  );
};
