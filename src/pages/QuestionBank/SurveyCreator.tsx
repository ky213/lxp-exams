import React, { useEffect } from 'react';
import { Button, Card, Col, Row, Space } from 'antd';
import { SurveyCreator, StylesManager } from 'survey-creator';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';

export default (props: any) => {
  let surveyCreator: SurveyCreator;
  useEffect(() => {
    StylesManager.applyTheme('');
    var options = {
      showToolbox: 'right',
      showLogicTab: true,
      showPropertyGrid: 'right',
      showEmbededSurveyTab: true,
    };
    surveyCreator = new SurveyCreator('creatorElement', options);
  }, []);

  const handleSubmit = () => {
    console.log(surveyCreator.JSON);
  };

  return (
    <Card>
      <Row justify="end">
        <Col span={6} style={{ marginLeft: '5px' }}>
          <Button size="large" type="primary" block onClick={handleSubmit}>
            <UploadOutlined /> Done
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div id="creatorElement"></div>
        </Col>
      </Row>
    </Card>
  );
};
