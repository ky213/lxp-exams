import { RootState } from '@/typings';
import { Button, Card, Descriptions, Result, Tag } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Survey } from 'survey-react';
import { ExamResult, EXAMS_ACTIONS, useDispatch, useParams, useSelector } from 'umi';

const ExamDelivery = () => {
  const { currentExam } = useSelector((state: RootState) => state.exams);
  const [startExam, setStartExam] = useState(false);
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

  const Opening = () => (
    <>
      <div>
        <Descriptions title="Exam Info">
          <Descriptions.Item label="Title">{currentExam?.settings.name}</Descriptions.Item>
          <Descriptions.Item label="Timing">
            {moment.duration(currentExam?.settings.maxTimeToFinish, 'minutes').asMinutes() || 'N/A'}{' '}
            Minutes
          </Descriptions.Item>
          <Descriptions.Item label="Date">{moment().format('L')}</Descriptions.Item>
          <Descriptions.Item label="Desciption">
            {currentExam?.settings.description}
          </Descriptions.Item>
        </Descriptions>
      </div>
      <div>
        <Result
          title="You are about the begin the exam, press Start when you're ready"
          extra={
            <Button type="primary" key="console" size="large" onClick={() => setStartExam(true)}>
              Start
            </Button>
          }
        />
      </div>
    </>
  );

  return (
    <Card>
      {!startExam && <Opening />}
      {currentExam && startExam && <Survey json={json} onComplete={handleOnComplete} />}
    </Card>
  );
};

export default ExamDelivery;
