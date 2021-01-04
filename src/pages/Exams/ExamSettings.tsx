import React, { useEffect } from 'react';
import { Button, Col, Form, Input, Radio, Row, Select, Space } from 'antd';
import { useHistory, Settings, useSelector, useDispatch, EXAMS_ACTIONS } from 'umi';
import { RootState } from '@/typings';
export interface ExamSettingsProps {
  onSaveExamSettings: (settings: Settings) => void;
}

const ExamSettings: React.FC<ExamSettingsProps> = ({ onSaveExamSettings }) => {
  const { loading } = useSelector((state: RootState) => state.exams);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    return () => {
      dispatch({
        type: EXAMS_ACTIONS.RESET,
      });
    };
  }, []);

  const handleOnFinish = (values: Settings) => {
    onSaveExamSettings(values);
  };

  return (
    <Row justify="center">
      <Col span={12}>
        <Form layout="vertical" size="large" onFinish={handleOnFinish}>
          <Form.Item name="_id" hidden={true}>
            <Input />
          </Form.Item>
          <Form.Item name="name" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item name="maxTimeToFinish" label="Timing (seconds)" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="maxAttempts" label="Max Attempts" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="gradingMethod" label="Grading Method" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="AVERAGE_ATTEMPT">Average Attempt</Select.Option>
              <Select.Option value=" LAST_ATTEMPT ">Last Attempt</Select.Option>
              <Select.Option value=" 'HIGHEST_ATTEMPT">Highest Attempt</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="numberOfQuestions"
            label="Number of questions"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="questionsPerPage"
            label="Questions per page"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item name="minPassScore" label="Min passing score" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="outOfMark" label="Out of mark" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="showFeedBack" label="Show feedback" rules={[{ required: true }]}>
            <Radio.Group >
              <Radio.Button value={true} >Yes</Radio.Button>
              <Radio.Button value={false}>No</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                Save
              </Button>
              <Button onClick={() => history.goBack()}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default ExamSettings;
