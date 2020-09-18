import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';

import SurveyCreator from '@/components/SurveyCreator';
import { Exam, EXAMS_ACTIONS, useDispatch, useHistory, useParams, useSelector } from 'umi';
import { SurveyObjects } from 'survey-creator';
import { RootState } from '@/typings';
import { message } from 'antd';
import ModeSelector from './ModeSelector';

export interface CreateEditExamProps {}

const CreateEditExam: React.FC<CreateEditExamProps> = () => {
  const [examData, setExamData]: [Exam | any, any] = useState(null);
  const [mode, setMode]: ['RANDOM' | 'MANUAL' | null, any] = useState(null);
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

  return (
    <PageContainer title="Creat/Edit Exams">
      {/* {examData && <SurveyCreator saveSurvey={handleSaveSurvey} />} */}
      <ModeSelector onSelectMode={setMode} />
    </PageContainer>
  );
};

export default CreateEditExam;
