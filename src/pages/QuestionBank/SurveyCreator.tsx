import React, { useEffect } from 'react';
import { Button, Card, Col, Row } from 'antd';
import { SurveyCreator, StylesManager, SurveyObjects } from 'survey-creator';
import { UploadOutlined } from '@ant-design/icons';
import { RootState } from '@/typings';
import { useSelector } from 'umi';

export interface SurveyCreatorProps {
  saveSurvey: (survey: SurveyObjects) => void;
}

let surveyCreator: SurveyCreator | undefined | null = null;

const SurveyCreatorComponent: React.FC<SurveyCreatorProps> = ({ saveSurvey }) => {
  const { currentQuestion, loading } = useSelector((state: RootState) => state.questions);

  useEffect(() => {
    initSurveyCreator();

    return () => {
      surveyCreator = null;
    };
  }, []);

  const initSurveyCreator = () => {
    StylesManager.applyTheme('');
    var options = {
      showToolbox: 'right',
      showLogicTab: true,
      showPropertyGrid: 'right',
      showEmbededSurveyTab: true,
    };

    surveyCreator = new SurveyCreator('creatorElement', options);

    if (currentQuestion && currentQuestion.content) surveyCreator.JSON = currentQuestion.content;
  };

  return (
    <Card>
      <Row justify="end">
        <Col span={6} style={{ marginLeft: '5px' }}>
          <Button
            size="large"
            type="primary"
            block
            onClick={() => saveSurvey(surveyCreator?.JSON)}
            loading={loading}
          >
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
