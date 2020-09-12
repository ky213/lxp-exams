import React, { useEffect } from 'react';
import { Card, Form, Select, Button, Space, Row, Col, Divider } from 'antd';
import { ArrowRightOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';

export const SelectCategory = () => {
  return (
    <Card>
      <Row>
        <Col span={12} offset={6}>
          <Form layout="vertical" size="large">
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: 'Please select a category!' }]}
            >
              <Select
                dropdownRender={(menu) => (
                  <div>
                    {menu}
                    <Divider style={{ margin: '4px 0' }} />
                    <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                      <a
                        style={{
                          flex: 'none',
                          padding: '8px',
                          display: 'block',
                          cursor: 'pointer',
                        }}
                      >
                        <PlusOutlined /> Add category
                      </a>
                    </div>
                  </div>
                )}
              >
                <Select.Option value="">no category...</Select.Option>
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
