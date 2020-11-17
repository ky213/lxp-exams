import React from 'react';
import { Card, Col, Row } from 'antd';
import { DatabaseFilled, EditFilled } from '@ant-design/icons';
import { ExamSource } from 'umi';

export interface SourceSelectorProps {
  onSelectSource: (mode: ExamSource) => void;
}

const SourceSelector: React.FC<SourceSelectorProps> = ({ onSelectSource }) => {
  return (
    <>
      <Row justify="center" gutter={8}>
        <Col span={8}>
          <Card
            hoverable
            cover={<DatabaseFilled className="exam-selector" />}
            onClick={() => onSelectSource('QUESTION_BANK')}
          >
            <Card.Meta
              title="Question Bank"
              description="The system will generate the exam from the existing questions saved in the database."
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            hoverable
            cover={<EditFilled className="exam-selector" />}
            onClick={() => onSelectSource('NO_QUESTION_BANK')}
          >
            <Card.Meta
              title="Without Question Bank"
              description="You'll use the exam editor to create and save new questions"
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default SourceSelector;
