import React from 'react';
import { Card, Col, Row } from 'antd';
import {
  BulbFilled,
  DatabaseFilled,
  EditFilled,
  ProfileFilled,
  QuestionCircleFilled,
} from '@ant-design/icons';
import { ExamType } from 'umi';

export interface TypeSelectorProps {
  onSelectType: (type: ExamType) => void;
}

export const TypeSelector: React.FC<TypeSelectorProps> = ({ onSelectType }) => {
  return (
    <>
      <Row justify="center" gutter={8}>
        <Col span={8}>
          <Card
            hoverable
            cover={<BulbFilled className="exam-selector" />}
            onClick={() => onSelectType('EXAM')}
            style={{ height: '100%' }}
          >
            <Card.Meta
              title="Exam"
              description="Create an exam based on questions stored in the database."
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            hoverable
            cover={<ProfileFilled className="exam-selector" />}
            onClick={() => onSelectType('SURVEY')}
            style={{ height: '100%' }}
          >
            <Card.Meta
              title="Survey"
              description="Create a suvey to collect data about learners and store them in the system for later learner evaluation."
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default TypeSelector;
