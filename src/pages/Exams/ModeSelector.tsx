import React from 'react';
import { Card, Col, Row } from 'antd';
import { DatabaseFilled, EditFilled } from '@ant-design/icons';
import { ExamMode } from 'umi';
export interface ModeSelectorProps {
  onSelectMode: (mode: ExamMode) => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({ onSelectMode }) => {
  return (
    <>
      <Row justify="center" gutter={8}>
        <Col span={8}>
          <Card
            hoverable
            cover={<DatabaseFilled className="exam-selector" />}
            onClick={() => onSelectMode('RANDOM')}
          >
            <Card.Meta
              title="Random"
              description="The system will generate the exam for ou based on the settings you'll be promted to set next."
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            hoverable
            cover={<EditFilled className="exam-selector" />}
            onClick={() => onSelectMode('MANUAL')}
          >
            <Card.Meta
              title="Manual"
              description="You'll use the exam editor to create exams manually"
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ModeSelector;
