import React, { useEffect } from 'react';
import { Form, Input, Button, Space, Row, Col, Select, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { RootState } from '@/typings';
import { CATEGORIES_ACTIONS, Category, useDispatch, useSelector } from 'umi';

export interface CategoriesSelectorProps {
  selectedCategories: Category[];
  onSelectCategories: (categories: Category[]) => void;
}

const CategoriesSelector: React.FC<CategoriesSelectorProps> = ({
  selectedCategories,
  onSelectCategories,
}) => {
  const { allCategories } = useSelector((state: RootState) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: CATEGORIES_ACTIONS.GET_ALL,
    });
  }, []);

  const onFinish = (values: any) => {
    if (!values.categories) message.error('Please add at least one category');

    const categories = allCategories.filter((category) => {
      for (const el of values.categories) {
        if (el.category === category.name) {
          category.weight = +el.weight;
          return category;
        }
      }
    });

    onSelectCategories(categories);
  };

  return (
    <Row justify="center">
      <Col span={12}>
        <Form name="categories" onFinish={onFinish} autoComplete="off">
          <Form.List name="categories">
            {(fields, { add, remove }) => {
              return (
                <div>
                  {fields.map((field) => (
                    <Space
                      key={field.key}
                      style={{ display: 'flex', marginBottom: 8 }}
                      align="start"
                    >
                      <Form.Item
                        {...field}
                        name={[field.name, 'category']}
                        fieldKey={[field.fieldKey, 'category']}
                        rules={[{ required: true }]}
                        style={{ width: '330px' }}
                      >
                        <Select placeholder="select category...">
                          {allCategories.map(({ name }) => (
                            <Select.Option key={name} value={name}>
                              {name}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, 'weight']}
                        fieldKey={[field.fieldKey, 'weight']}
                        rules={[{ required: true }]}
                      >
                        <Input type="number" placeholder="weight" />
                      </Form.Item>

                      <MinusCircleOutlined
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    </Space>
                  ))}

                  <Form.Item>
                    <Button type="dashed" onClick={add} block>
                      <PlusOutlined /> Add category
                    </Button>
                  </Form.Item>
                </div>
              );
            }}
          </Form.List>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
export default CategoriesSelector;
