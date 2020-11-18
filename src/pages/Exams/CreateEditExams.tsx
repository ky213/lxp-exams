import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, message, Result, Steps } from 'antd';
import { SurveyObjects } from 'survey-creator';
import {
  Category,
  Exam,
  ExamMode,
  ExamSource,
  EXAMS_ACTIONS,
  ExamType,
  Link,
  useDispatch,
  useHistory,
  useSelector,
} from 'umi';

import SurveyCreator from '@/components/SurveyCreator';
import { RootState } from '@/typings';
import {
  ExamSettings,
  CategoriesSelector,
  ModeSelector,
  TypeSelector,
  SourceSelector,
} from './index';

export interface CreateEditExamProps {}

const CreateEditExam: React.FC<CreateEditExamProps> = () => {
  const [examData, setExamData]: [Exam | any, any] = useState(null);
  const [mode, setMode]: [ExamMode | null, any] = useState(null);
  const [source, setSource]: [ExamSource | null, any] = useState(null);
  const [type, setType]: [ExamType | null, any] = useState(null);
  const [categories, setCategories]: [Category[] | null, any] = useState(null);
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

  const handleOnSelectSource = (examSource: ExamSource) => {
    const step = examSource === 'QUESTION_BANK' ? 2 : 5;

    setSource(examSource);
    setCurrentStep(step);
  };

  const handleOnSelectType = (examType: ExamType) => {
    setType(examType);
    setCurrentStep(1);
  };

  const handleOnSelectMode = (examMode: ExamMode) => {
    setMode(examMode);
    setCurrentStep(3);
  };

  const handleOnSelectCategories = (categories: Category[]) => {
    setCategories(categories);
    setCurrentStep(5);
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
          <Steps.Step key="type" title="Type" />
          <Steps.Step key="source" title="Source" />
          <Steps.Step key="mode" title="Mode" />
          <Steps.Step key="categories" title="Categories" />
          <Steps.Step key="settings" title="Settings" disabled={source === 'QUESTION_BANK'} />
          <Steps.Step key="creator" title="Creator" disabled={source === 'QUESTION_BANK'} />
        </Steps>
        {currentStep === 0 && <TypeSelector onSelectType={handleOnSelectType} />}
        {currentStep === 1 && <SourceSelector onSelectSource={handleOnSelectSource} />}
        {currentStep === 2 && <ModeSelector onSelectMode={handleOnSelectMode} />}
        {currentStep === 3 && <CategoriesSelector onSelectCategories={handleOnSelectCategories} />}
        {currentStep === 4 && <ExamSettings />}
        {currentStep === 5 && (
          <SurveyCreator saveSurvey={handleSaveSurvey} mode={mode} source={source} />
        )}
      </Card>
    </PageContainer>
  );
};

export default CreateEditExam;
