import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';

import SurveyCreator from '@/components/SurveyCreator';
import SelectCategory from './SelectCategory';
import { Question, QUESTIONS_ACTIONS, useDispatch, useHistory, useSelector } from 'umi';
import { SurveyObjects } from 'survey-creator';
import { RootState } from '@/typings';
import { message } from 'antd';

export interface CreateEditCategoryProps {}

const CreateEditCategory: React.FC<CreateEditCategoryProps> = () => {
  const [questionData, setQuestionData]: [Question | any, any] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentQuestion, saveSuccess, loading } = useSelector(
    (state: RootState) => state.questions,
  );

  useEffect(() => {
    return () => {
      dispatch({
        type: QUESTIONS_ACTIONS.RESET,
      });
    };
  }, []);

  useEffect(() => {
    if (!loading && saveSuccess) {
      message.success('Questions saved successfully');
      history.push('/questions/list');
    }
  }, [saveSuccess]);

  const handleSaveSurvey = (survey: SurveyObjects) => {
    const surveyData = { ...questionData, content: survey };
    if (currentQuestion && currentQuestion._id)
      dispatch({
        type: QUESTIONS_ACTIONS.UPDATE,
        payload: surveyData,
      });
    else
      dispatch({
        type: QUESTIONS_ACTIONS.CREATE,
        payload: surveyData,
      });
  };

  return (
    <PageContainer>
      {questionData && <SurveyCreator saveSurvey={handleSaveSurvey} />}
      {!questionData && <SelectCategory onQuestionDataSave={setQuestionData} />}
    </PageContainer>
  );
};

export default CreateEditCategory;
