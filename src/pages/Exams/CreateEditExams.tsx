import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, message, Steps } from 'antd';
import { SurveyObjects } from 'survey-creator';
import {
  Category,
  ExamMode,
  ExamSource,
  EXAMS_ACTIONS,
  ExamType,
  Question,
  Settings,
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
  QuestionsSelector,
} from './index';
import { IElement, ISurvey } from 'survey-react';

export interface CreateEditExamProps {}

const CreateEditExam: React.FC<CreateEditExamProps> = () => {
  const [mode, setMode]: [ExamMode | null, any] = useState(null);
  const [source, setSource]: [ExamSource | null, any] = useState(null);
  const [type, setType]: [ExamType | null, any] = useState(null);
  const [categories, setSelectedCategories]: [Category[], any] = useState([]);
  const [selectedQuestions, setSelectedQuestions]: [IElement[], any] = useState([]);
  const [settings, setSettings]: [Settings | null, any] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentExam, saveSuccess, loading, error } = useSelector(
    (state: RootState) => state.exams,
  );

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

    if (!loading && error) {
      message.error(`Error: ${error.message}`);
    }
  }, [saveSuccess]);

  useEffect(() => {
    if (settings && source === 'QUESTION_BANK') handleSaveSurvey(null);
  }, [settings]);

  const handleSaveSurvey = (survey: ISurvey | null) => {
    const surveyData = {
      type,
      source,
      mode: mode || 'NONE',
      categories,
      settings,
      content: survey || { pages: [{ elements: selectedQuestions }] },
    };

    if (currentExam?._id)
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

  const handleOnSelectCategories = (selectedCategories: Category[]) => {
    const step = mode === 'RANDOM' ? 5 : 4;

    setSelectedCategories(selectedCategories);
    setCurrentStep(step);
  };

  const handleOnSelectQuestions = (questions: IElement[] | null) => {
    setSelectedQuestions(questions);
    setCurrentStep(5);
  };

  const handleOnSaveExamSettings = (values: Settings) => {
    setSettings(values);
    if (source === 'NO_QUESTION_BANK') setCurrentStep(6);
  };

  let activeSteps: string = '0';

  if (source === 'NO_QUESTION_BANK') activeSteps = '0156';
  else if (mode === 'RANDOM') activeSteps = '01235';
  else if (mode === 'MANUAL') activeSteps = '012345';

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
          <Steps.Step key="source" title="Source" disabled={!activeSteps.includes('1')} />
          <Steps.Step key="mode" title="Mode" disabled={!activeSteps.includes('2')} />
          <Steps.Step key="categories" title="Categories" disabled={!activeSteps.includes('3')} />
          <Steps.Step key="questions" title="Questions" disabled={!activeSteps.includes('4')} />
          <Steps.Step key="settings" title="Settings" disabled={!activeSteps.includes('5')} />
          <Steps.Step key="creator" title="Creator" disabled={!activeSteps.includes('6')} />
        </Steps>
        {currentStep === 0 && <TypeSelector onSelectType={handleOnSelectType} />}
        {currentStep === 1 && <SourceSelector onSelectSource={handleOnSelectSource} />}
        {currentStep === 2 && <ModeSelector onSelectMode={handleOnSelectMode} />}
        {currentStep === 3 && (
          <CategoriesSelector
            mode={mode}
            selectedCategories={categories}
            onSelectCategories={handleOnSelectCategories}
          />
        )}
        {currentStep === 4 && (
          <QuestionsSelector categories={categories} onSelectQuestions={handleOnSelectQuestions} />
        )}
        {currentStep === 5 && <ExamSettings onSaveExamSettings={handleOnSaveExamSettings} />}
        {currentStep === 6 && (
          <SurveyCreator saveSurvey={handleSaveSurvey} mode={mode} source={source} />
        )}
      </Card>
    </PageContainer>
  );
};

export default CreateEditExam;
