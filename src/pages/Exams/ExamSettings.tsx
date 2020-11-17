import React, { useState } from 'react';
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Radio,
  Row,
  Select,
  Space,
  Steps,
  TimePicker,
} from 'antd';
import { useHistory } from 'umi';

export interface ExamSettingsProps {}

export const ExamSettings: React.FC<ExamSettingsProps> = () => {
  const history = useHistory();
  return (
    <Row justify="center">
      <Col span={12}>
        <Form layout="vertical" size="large">
          <Form.Item name="'_id" hidden={true}>
            <Input />
          </Form.Item>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item name="timing" label="Timing" rules={[{ required: true }]}>
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
            <Radio.Group defaultValue={false}>
              <Radio.Button value={true}>Yes</Radio.Button>
              <Radio.Button value={false}>No</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
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
