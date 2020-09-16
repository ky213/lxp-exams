import React, { Dispatch, SetStateAction, useEffect } from 'react';
import {
  Link,
  useSelector,
  useDispatch,
  CATEGORIES_ACTIONS,
  useParams,
  QUESTIONS_ACTIONS,
  useHistory,
  Question,
} from 'umi';
import { Card, Form, Select, Button, Space, Row, Col, Divider, Input } from 'antd';
import { ArrowRightOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';

import { RootState } from '@/typings';

export interface SelectCategoryProps {
  onQuestionDataSave: Dispatch<SetStateAction<Question | undefined>>;
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
  }, []);

  const handleSubmit = (values: Question) => {
    props.onQuestionDataSave(values);
  };

  const handleCancel = () => {
    dispatch({
      type: QUESTIONS_ACTIONS.RESET,
    });
    history.goBack();
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
            <Form.Item name="_id" initialValue={questions.currentQuestion?._id} hidden>
              <Input />
            </Form.Item>
            <Form.Item
              name="title"
              label="Title"
              initialValue={questions.currentQuestion?.title}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Category" name="category" rules={[{ required: true }]}>
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
                <Button icon={<CloseOutlined />} onClick={handleCancel}>
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
