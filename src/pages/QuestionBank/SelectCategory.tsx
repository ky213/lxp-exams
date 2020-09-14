import React, { Dispatch, SetStateAction, useEffect } from 'react';
import {
  Link,
  useSelector,
  useDispatch,
  CATEGORIES_ACTIONS,
  IRouteComponentProps,
  Category,
} from 'umi';
import { Card, Form, Select, Button, Space, Row, Col, Divider } from 'antd';
import { ArrowRightOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';

import { RootState } from '@/typings';
import Categories from './Categories';

export interface SelectCategoryProps {
  onSelectedCategory: Dispatch<SetStateAction<Category | undefined>>;
}

export const SelectCategory = (props: SelectCategoryProps) => {
  const { allCategories } = useSelector((state: RootState) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: CATEGORIES_ACTIONS.GET_ALL,
    });
  }, []);

  const handleSubmit = (values: { categoryId: string }) => {
    const selectedCategory = allCategories.find(({ id }) => id == values.categoryId);
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
    <Card>
      <Row>
        <Col span={12} offset={6}>
          <Form layout="vertical" size="large" onFinish={handleSubmit}>
            <Form.Item label="Category" name="categoryId" rules={[{ required: true }]}>
              <Select dropdownRender={dropdownRender} placeholder="select category...">
                {allCategories.map((category) => (
                  <Select.Option key={category.id} value={category.id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit" icon={<ArrowRightOutlined />}>
                  Next
                </Button>
                <Button icon={<CloseOutlined />}>Cancel</Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Card>
  );
};

export default SelectCategory;
