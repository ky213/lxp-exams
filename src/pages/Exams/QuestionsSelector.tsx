import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Table } from 'antd';
import { Category, Question, QUESTIONS_ACTIONS, useDispatch, useSelector } from 'umi';
import { RootState } from '@/typings';
import { isEmpty } from 'lodash';
import { IElement } from 'survey-react';
import { ReactText } from 'react';

export interface QuestionsSelectorProps {
  categories: Category[];
  onSelectQuestions: (selectedQuestions: IElement[] | null) => void;
}

export interface TableData {
  key: number;
  category: string;
  name: string;
  type: string;
}

const QuestionsSelector: React.FC<QuestionsSelectorProps> = ({ categories, onSelectQuestions }) => {
  const [selectedRows, setSelectedRows]: [number[], any] = useState([]);
  const [data, setData]: [TableData[], any] = useState([]);
  const [elements, setElements]: [IElement[], any] = useState([]);
  const [selectedQuestionsElements, setSelectedQuestionsElements]: [IElement[], any] = useState([]);
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

  const onSelectedRows = (selectedRowKeys: ReactText[]) => {
    setSelectedRows(selectedRowKeys);
    const questionsNames: string[] = data
      .filter((el) => selectedRowKeys.includes(el.key))
      .map((el) => el.name);

    const selectedElements = elements.filter((element) => questionsNames.includes(element.name));

    setSelectedQuestionsElements(selectedElements);
  };

  const filterQuestions = () => {
    const tableData: TableData[] = [];
    const elementsHolder: IElement[] = [];

    categories.forEach((category) => {
      allQuestions.forEach((question) => {
        if (question.category.name === category.name) {
          question.content.pages.forEach((page) => {
            page.elements.forEach((element) => {
              tableData.push({
                key: 0,
                name: element.name,
                category: category.name,
                type: element.type,
              });

              elementsHolder.push(element);
            });
          });
        }
      });
    });

    setElements(elementsHolder);

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
    onChange: (selectedRowKeys: ReactText[]) => onSelectedRows(selectedRowKeys),
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
            onClick={() => onSelectQuestions(selectedQuestionsElements)}
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
