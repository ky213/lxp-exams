import React, { useEffect } from 'react';
import { Button, Card, Col, Row } from 'antd';
import { SurveyCreator, StylesManager, SurveyObjects } from 'survey-creator';
import { UploadOutlined } from '@ant-design/icons';

export interface SurveyCreatorProps {
  saveSurvey: (survey: SurveyObjects) => void;
}

let surveyCreator: SurveyCreator | undefined | null = null;

const SurveyCreatorComponent: React.FC<SurveyCreatorProps> = ({ saveSurvey }) => {
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

  return (
    <Card>
      <Row justify="end">
        <Col span={6} style={{ marginLeft: '5px' }}>
          <Button size="large" type="primary" block onClick={() => saveSurvey(surveyCreator?.JSON)}>
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

export default SurveyCreatorComponent;
