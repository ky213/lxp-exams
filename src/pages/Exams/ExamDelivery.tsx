import { RootState } from '@/typings';
import React, { useEffect } from 'react';
import { Survey } from 'survey-react';
import { EXAMS_ACTIONS, useDispatch, useParams, useSelector } from 'umi';

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

  return <div>{currentExam && <Survey json={currentExam?.content} />}</div>;
};

export default ExamDelivery;
