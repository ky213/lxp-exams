import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Table } from 'antd';
import { Category, Question, QUESTIONS_ACTIONS, useDispatch, useSelector } from 'umi';
import { RootState } from '@/typings';
import { isEmpty } from 'lodash';

export interface QuestionsSelectorProps {
  categories: Category[];
  onSelectQuestions: (selectedQuestions: Question[] | null) => void;
}

const QuestionsSelector: React.FC<QuestionsSelectorProps> = ({ categories, onSelectQuestions }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [data, setData] = useState([]);
  const { loading, allQuestions } = useSelector((state: RootState) => state.questions);
  const dispatch = useDispatch();

  useEffect(() => {
    const payload = categories.map(({ _id }) => _id);
    dispatch({
      type: QUESTIONS_ACTIONS.GET_BY_CATEGORIES,
      payload,
    });
  }, []);

  useEffect(() => {
    if (!isEmpty(allQuestions) && isEmpty(data)) filterQuestions();
  }, [allQuestions]);

  const filterQuestions = () => {
    let tableData = [];

    categories.forEach((category) => {
      allQuestions.forEach((question) => {
        if (question.category.name === category.name) {
          question.content.pages.forEach((page) => {
            page.elements.forEach((element) => {
              tableData.push({
                category: category.name,
                name: element.name,
                type: element.type,
              });
            });
          });
        }
      });
    });

    setData(
      tableData.map((d, i) => {
        return { ...d, key: i };
      }),
    );
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
  ];

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
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} loading={loading} />
    </div>
  );
};

export default QuestionsSelector;
