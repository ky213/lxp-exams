import React from 'react';
import { Card, Col, Row } from 'antd';
import { DatabaseFilled, EditFilled } from '@ant-design/icons';
export interface ModeSelectorProps {
  onSelectMode: React.Dispatch<React.SetStateAction<'RANDOM' | 'MANUAL'>>;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({ onSelectMode }) => {
  return (
    <Card title="Select creation mode">
      <Row justify="center" gutter={8}>
        <Col span={8}>
          <Card
            hoverable
            cover={<DatabaseFilled className="exam-mode-selector" />}
            onClick={() => onSelectMode('RANDOM')}
          >
            <Card.Meta
              title="Random"
              description="The system will gerate the exam for ou based on the settings you'll be promted to set next."
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            hoverable
            cover={<EditFilled className="exam-mode-selector" />}
            onClick={() => onSelectMode('MANUAL')}
          >
            <Card.Meta
              title="Manual"
              description="You'll use the exam editor to create exams manually"
            />
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default ModeSelector;
