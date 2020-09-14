import React, { useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Space, Typography, Popconfirm } from 'antd';
import { Link } from 'umi';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '@/typings';
import { CATEGORIES_ACTIONS, Category } from '@/models/categories';
import { DeleteFilled, EditFilled } from '@ant-design/icons';

export const Categories = () => {
  const { allCategories, loading } = useSelector((state: RootState) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: CATEGORIES_ACTIONS.GET_ALL,
    });
  }, []);

  const handleDelete = (category: Category) => {
    dispatch({
      type: CATEGORIES_ACTIONS.DELETE,
      payload: category.id,
    });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Desciption',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_text: string, record: Category) => (
        <Space size="middle">
          <Link to={`edit/${record.id}`}>
            <a>
              <EditFilled /> Edit
            </a>
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
    <PageContainer title="Categories">
      <Table columns={columns} dataSource={allCategories} showSorterTooltip loading={loading} />
    </PageContainer>
  );
};

export default Categories;
