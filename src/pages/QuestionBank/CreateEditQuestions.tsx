import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';

import SurveyCreator from './SurveyCreator';
import SelectCategory from './SelectCategory';
import { Category, QUESTIONS_ACTIONS, useDispatch, useHistory, useParams, useSelector } from 'umi';
import { SurveyObjects } from 'survey-creator';
import { RootState } from '@/typings';
import { message } from 'antd';

export interface CreateEditCategoryProps {}

const CreateEditCategory: React.FC<CreateEditCategoryProps> = () => {
  const [selectedCategory, setSelectedCategory]: [Category | any, any] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const params: { id: string } = useParams();
  const { currentQuestion, saveSuccess, loading } = useSelector(
    (state: RootState) => state.questions,
  );

  useEffect(() => {
    if (params.id)
      dispatch({
        type: QUESTIONS_ACTIONS.GET_BY_ID,
        payload: params.id,
      });

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
    const surveyData = { ...selectedCategory, content: survey };
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
      {selectedCategory && <SurveyCreator saveSurvey={handleSaveSurvey} />}
      {!selectedCategory && <SelectCategory onSelectedCategory={setSelectedCategory} />}
    </PageContainer>
  );
};

export default CreateEditCategory;
