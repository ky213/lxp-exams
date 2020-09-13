import React, { Component, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Tag, Space, Typography } from 'antd';
import { Link } from 'umi';
import { connect, useSelector, useDispatch } from 'react-redux';

import { RootState } from '@/typings';
import { ACTIONS, Category } from '@/models/categories';

export const Categories = () => {
  const categories = useSelector((state: RootState) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: ACTIONS.GET_ALL,
    });
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Desciption',
      dataIndex: 'desciprion',
      key: 'desciprion',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_text: string, record: Category) => (
        <Space size="middle">
          <Link to={`edit/${record.id}`}>
            <a>Edit</a>
          </Link>
          <a>
            <Typography.Text type="danger">Delete</Typography.Text>
          </a>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer title="Categories">
      <Table
        columns={columns}
        dataSource={categories.allCategories}
        showSorterTooltip
        loading={categories.loading}
      />
    </PageContainer>
  );
};

export default Categories;
