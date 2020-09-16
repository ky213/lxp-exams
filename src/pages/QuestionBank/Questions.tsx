import React, { useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Space, Typography, Popconfirm } from 'antd';
import { Link } from 'umi';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteFilled, EditFilled } from '@ant-design/icons';

import { RootState } from '@/typings';
import { QUESTIONS_ACTIONS, Question } from '@/models/questions';

export const Questions = () => {
  const { allQuestions, loading } = useSelector((state: RootState) => state.questions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: QUESTIONS_ACTIONS.GET_ALL,
    });
  }, []);

  const handleDelete = (question: Question) => {
    dispatch({
      type: QUESTIONS_ACTIONS.DELETE,
      payload: question._id,
    });
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Desciption',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_text: string, record: Question) => (
        <Space size="middle">
          <Link to={`edit/${record._id}`}>
            <EditFilled /> Edit
          </Link>
          <Popconfirm
            title="Are you sure to delete this category?"
            onConfirm={() => handleDelete(record)}
          >
            <a>
              <Typography.Text type="danger">
                <DeleteFilled /> Delete
              </Typography.Text>
            </a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer title="Questions">
      <Table
        columns={columns}
        dataSource={allQuestions}
        showSorterTooltip
        loading={loading}
        rowKey={'_id'}
      />
    </PageContainer>
  );
};

export default Questions;
