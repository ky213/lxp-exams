import { RootState } from '@/typings';
import { Button, Card, Descriptions, Result, Tag } from 'antd';
import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import * as Survey from 'survey-react';
import { ExamResult, EXAMS_ACTIONS, useDispatch, useParams, useSelector } from 'umi';

const ExamResultView = ({ result }: any) => {
  const { currentExam } = useSelector((state: RootState) => state.exams);
  const survey = new Survey.Model(currentExam);

  survey.onComplete.add(function (result) {
    // document.querySelector('#surveyResult').textContent =
    //   'Result JSON:\n' + JSON.stringify(result.data, null, 3);
  });

  survey.data = result;

  survey.mode = 'display';
  survey.questionsOnPageMode = 'singlePage';
  survey.showNavigationButtons = 'none';
  survey.showProgressBar = 'off';
  survey.showTimerPanel = 'none';
  survey.maxTimeToFinishPage = 0;
  survey.maxTimeToFinish = 0;
  survey.onAfterRenderQuestion.add(function (currentExam, options) {
    var span = document.createElement('span');
    var isCorrect = options.question.isAnswerCorrect();
    span.innerHTML = isCorrect ? 'Correct' : 'Incorrect';
    span.style.color = isCorrect ? 'green' : 'red';
    var header = options.htmlElement.querySelector('h5');
    if (!isCorrect) {
      header.style.backgroundColor = 'salmon';
      var radio = options.htmlElement.querySelector(
        'input[value="' + options.question.correctAnswer + '"]',
      );
      if (!!radio) {
        radio.parentElement.style.color = 'green';
      }
    }
    header.appendChild(span);
  });

  return <Survey.Survey model={survey} />;
};

const ExamDelivery = () => {
  const { currentExam } = useSelector((state: RootState) => state.exams);
  const [startExam, setStartExam] = useState(false);
  const [finalResult, setFinalResult] = useState({});
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

    setFinalResult(result.data);
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
      {currentExam && startExam && <Survey.Survey json={json} onComplete={handleOnComplete} />}
      {!isEmpty(finalResult) && <ExamResultView result={finalResult} />}
    </Card>
  );
};

export default ExamDelivery;
