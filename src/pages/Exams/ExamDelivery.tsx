import { RootState } from '@/typings';
import React, { useEffect } from 'react';
import { Survey } from 'survey-react';
import { ExamResult, EXAMS_ACTIONS, useDispatch, useParams, useSelector } from 'umi';

const ExamDelivery = () => {
  const { currentExam } = useSelector((state: RootState) => state.exams);
  const { examId }: { examId: string } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: EXAMS_ACTIONS.GET_BY_ID,
      payload: examId,
    });
    return () => {
      dispatch({
        type: EXAMS_ACTIONS.RESET,
      });
    };
  }, []);

  const handleOnComplete = (result: any) => {
    const payload: ExamResult = {
      examId,
      userId: '',
      score: result.score,
      timeSpent: result.timeSpent,
      answers: result.data,
    };
    dispatch({
      type: EXAMS_ACTIONS.SAVE_RESULT,
      payload,
    });
  };

  const json = {
    pages: currentExam?.content.pages,
    completedHtml:
      '<h3>Thank you for taking the exam.</h3> <h5>The exam result is saved automatically to the database</h5>',
  };

  return <div>{currentExam && <Survey json={json} onComplete={handleOnComplete} />}</div>;
};

export default ExamDelivery;
