import React, { useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Space, Typography, Popconfirm } from 'antd';
import { Link } from 'umi';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '@/typings';
import { EXAMS_ACTIONS, Exam } from '@/models/exams';
import { DeleteFilled, EditFilled } from '@ant-design/icons';

export const Exams = () => {
  const { allExams, loading } = useSelector((state: RootState) => state.exams);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: EXAMS_ACTIONS.GET_ALL,
    });
  }, []);

  const handleDelete = (exam: Exam) => {
    dispatch({
      type: EXAMS_ACTIONS.DELETE,
      payload: exam._id,
    });
  };

  const columns = [
    {
      title: 'Title',
      key: 'title',
      render(_text: string, record: Exam) {
        return record.settings.name || record.content?.title;
      },
    },
    {
      title: 'Desciption',
      key: 'description',
      render(_text: string, record: Exam) {
        return record.settings.description || record.content?.description;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_text: string, record: Exam) => (
        <Space size="middle">
          {/* <Link to={`edit/${record._id}`}>
            <EditFilled /> Edit
          </Link> */}
          <Popconfirm
            title="Are you sure to delete this exam?"
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
    <PageContainer title="Exams">
      <Table
        columns={columns}
        dataSource={allExams}
        showSorterTooltip
        loading={loading}
        rowKey={'_id'}
      />
    </PageContainer>
  );
};

export default Exams;
