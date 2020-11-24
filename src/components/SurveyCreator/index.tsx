import React, { useEffect } from 'react';
import { Button, Card, Col, Result, Row } from 'antd';
import { SurveyCreator, StylesManager } from 'survey-creator';
import { CloseOutlined, UploadOutlined } from '@ant-design/icons';
import { RootState } from '@/typings';
import {
  ExamMode,
  ExamSource,
  Link,
  QUESTIONS_ACTIONS,
  useDispatch,
  useHistory,
  useSelector,
} from 'umi';
import { ISurvey } from 'survey-react';

export interface SurveyCreatorProps {
  saveSurvey: (survey: ISurvey) => void;
  mode?: ExamMode | null;
  source?: ExamSource | null;
}

let surveyCreator: SurveyCreator | undefined | null = null;

const SurveyCreatorComponent: React.FC<SurveyCreatorProps> = ({ saveSurvey, mode, source }) => {
  const { currentQuestion, loading } = useSelector((state: RootState) => state.questions);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    initSurveyCreator();

    return () => {
      surveyCreator = null;
      dispatch({
        type: QUESTIONS_ACTIONS.RESET,
      });
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

    if (currentQuestion?.content) surveyCreator.JSON = currentQuestion.content;
  };

  return (
    <Card>
      {mode === 'RANDOM' && source === 'QUESTION_BANK' ? (
        <Result
          status="success"
          title="Successfully created exam"
          subTitle="The exam questions will be generated on runtime"
          extra={[<Link to="/exams/exams/list">Go Back</Link>]}
        />
      ) : (
        <>
          <Row justify="end" style={{ marginBottom: '20px' }}>
            <Col span={6} style={{ marginLeft: '5px' }}>
              <Button size="large" block onClick={() => history.goBack()}>
                <CloseOutlined /> Cancel
              </Button>
            </Col>
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
        </>
      )}
    </Card>
  );
};

export default SurveyCreatorComponent;
