import { Button, Col, Row, Table } from 'antd';
import React, { useState } from 'react';
import { Question } from 'umi';

export interface QuestionsSelectorProps {
  onSelectQuestions: (selectedQuestions: Question[] | null) => void;
}

const QuestionsSelector: React.FC<QuestionsSelectorProps> = ({ onSelectQuestions }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
  ];

  const data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      title: `Question ${i}`,
      description: `Question ${i} description`,
      category: `Category ${i}`,
    });
  }

  const rowSelection = {
    selectedRows,
    onChange: (selectedRowKeys: any) => setSelectedRows(selectedRowKeys),
  };
  const hasSelected = selectedRows.length > 0;
  return (
    <div>
      <Row style={{ marginBottom: 16 }} justify="end">
        <Col>
          <span style={{ marginRight: 8 }}>
            {hasSelected ? `Selected ${selectedRows.length} items` : ''}
          </span>
          <Button
            type="primary"
            onClick={() => onSelectQuestions(null)}
            disabled={!hasSelected}
            block
          >
            Submit
          </Button>
        </Col>
      </Row>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
};

export default QuestionsSelector;
