import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { message } from 'antd';
import { IPage, ISurvey, ISurveyElement } from 'survey-react';
import {
  ISurveyPage,
  Question,
  QUESTIONS_ACTIONS,
  useDispatch,
  useHistory,
  useSelector,
} from 'umi';
import { v4 as uuid } from 'uuid';

import SurveyCreator from '@/components/SurveyCreator';
import SelectCategory from './SelectCategory';
import { RootState } from '@/typings';

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

  const handleSaveSurvey = (survey: ISurvey) => {
    survey = insertIdsToSurveyElements(survey);

    if (currentQuestion?._id)
      dispatch({
        type: QUESTIONS_ACTIONS.UPDATE,
        payload: { ...questionData, content: survey },
      });
    else
      dispatch({
        type: QUESTIONS_ACTIONS.CREATE,
        payload: { ...questionData, content: survey },
      });
  };

  const insertIdsToSurveyElements = (survey: ISurvey): ISurvey => {
    const newSurveyPages: any[] = survey.pages.map(({ elements }) =>
      elements.map((element) => ({ ...element, id: uuid() })),
    );

    console.log(newSurveyPages);
    return { ...survey, pages: newSurveyPages };
  };

  return (
    <PageContainer>
      {questionData && <SurveyCreator saveSurvey={handleSaveSurvey} />}
      {!questionData && <SelectCategory onQuestionDataSave={setQuestionData} />}
    </PageContainer>
  );
};

export default CreateEditCategory;
