import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';

import SurveyCreator from '@/components/SurveyCreator';
import {
  Exam,
  ExamMode,
  EXAMS_ACTIONS,
  ExamType,
  useDispatch,
  useHistory,
  useParams,
  useSelector,
} from 'umi';
import { SurveyObjects } from 'survey-creator';
import { RootState } from '@/typings';
import { Card, Carousel, message, Steps } from 'antd';
import ModeSelector from './ModeSelector';
import ExamSettings from './ExamSettings';
import TypeSelector from './TypeSelector';

export interface CreateEditExamProps {}

const CreateEditExam: React.FC<CreateEditExamProps> = () => {
  const [examData, setExamData]: [Exam | any, any] = useState(null);
  const [mode, setMode]: [ExamMode | null, any] = useState(null);
  const [type, setType]: [ExamType | null, any] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentExam, saveSuccess, loading } = useSelector((state: RootState) => state.exams);
  useEffect(() => {
    return () => {
      dispatch({
        type: EXAMS_ACTIONS.RESET,
      });
    };
  }, []);

  useEffect(() => {
    if (!loading && saveSuccess) {
      message.success('Exams saved successfully');
      history.push('/exams/list');
    }
  }, [saveSuccess]);

  const handleSaveSurvey = (survey: SurveyObjects) => {
    const surveyData = { ...examData, content: survey };
    if (currentExam && currentExam._id)
      dispatch({
        type: EXAMS_ACTIONS.UPDATE,
        payload: surveyData,
      });
    else
      dispatch({
        type: EXAMS_ACTIONS.CREATE,
        payload: surveyData,
      });
  };

  const handleOnSelectType = (type: ExamType) => {
    setType(type);
    setCurrentStep(1);
  };

  const handleOnSelectMode = (mode: ExamMode) => {
    setType(mode);
    setCurrentStep(2);
  };

  return (
    <PageContainer title="Creat/Edit Exams">
      <Card>
        <Steps
          type="navigation"
          current={currentStep}
          style={{ marginBottom: '1rem' }}
          onChange={setCurrentStep}
        >
          <Steps.Step key="type" title="Select type" />
          <Steps.Step key="mode" title="Select mode" />
          <Steps.Step key="settings" title="Settings" />
        </Steps>
        {currentStep === 0 && <TypeSelector onSelectType={handleOnSelectType} />}
        {currentStep === 1 && <ModeSelector onSelectMode={handleOnSelectMode} />}
        {currentStep === 2 && <ExamSettings />}
        {/* {mode && mode === 'MANUAL' && <SurveyCreator saveSurvey={handleSaveSurvey} />}
        {mode && mode === 'RANDOM' && <ExamSettings />} */}
      </Card>
    </PageContainer>
  );
};

export default CreateEditExam;
