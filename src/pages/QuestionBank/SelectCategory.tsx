import React, { Dispatch, SetStateAction, useEffect } from 'react';
import {
  Link,
  useSelector,
  useDispatch,
  CATEGORIES_ACTIONS,
  Category,
  useParams,
  QUESTIONS_ACTIONS,
  useHistory,
} from 'umi';
import { Card, Form, Select, Button, Space, Row, Col, Divider, Input } from 'antd';
import { ArrowRightOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';

import { RootState } from '@/typings';

export interface SelectCategoryProps {
  onSelectedCategory: Dispatch<SetStateAction<Category | undefined>>;
}

export const SelectCategory = (props: SelectCategoryProps) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params: { id: string } = useParams();
  const { questions, categories } = useSelector((state: RootState) => state);

  useEffect(() => {
    dispatch({
      type: CATEGORIES_ACTIONS.GET_ALL,
    });

    if (params.id)
      dispatch({
        type: QUESTIONS_ACTIONS.GET_BY_ID,
        payload: params.id,
      });

    return () => {
      dispatch({
        type: QUESTIONS_ACTIONS.RESET,
      });
    };
  }, []);

  const handleSubmit = (values: { categoryId: string }) => {
    const selectedCategory = categories.allCategories.find(
      ({ _id: id }) => id == values.categoryId,
    );
    props.onSelectedCategory(selectedCategory);
  };

  const dropdownRender = (menu: React.ReactNode) => (
    <div>
      {menu}
      <Divider style={{ margin: '4px 0' }} />
      <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
        <Link
          to="categories/edit"
          style={{
            flex: 'none',
            padding: '5px',
            display: 'block',
            cursor: 'pointer',
          }}
        >
          <PlusOutlined /> Add category
        </Link>
      </div>
    </div>
  );

  return (
    <Card loading={questions.loading}>
      <Row>
        <Col span={12} offset={6}>
          <Form layout="vertical" size="large" onFinish={handleSubmit}>
            <Form.Item
              name="title"
              label="Title"
              initialValue={questions.currentQuestion?.title}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Category" name="categoryId" rules={[{ required: true }]}>
              <Select dropdownRender={dropdownRender} placeholder="select category...">
                {categories.allCategories.map((category) => (
                  <Select.Option key={category._id} value={category._id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              initialValue={questions.currentQuestion?.description}
              rules={[{ required: true }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit" icon={<ArrowRightOutlined />}>
                  Next
                </Button>
                <Button icon={<CloseOutlined />} onClick={() => history.goBack()}>
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Card>
  );
};

export default SelectCategory;
