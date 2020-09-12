import React, { useEffect } from 'react';
import { Link } from 'umi';
import { Card, Form, Select, Button, Space, Row, Col, Divider } from 'antd';
import { ArrowRightOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';

export const SelectCategory = () => {
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

  const handleSubmit = (values: {}) => {
    console.log(values);
  };

  return (
    <Card>
      <Row>
        <Col span={12} offset={6}>
          <Form layout="vertical" size="large" onFinish={handleSubmit}>
            <Form.Item label="Category" name="category" rules={[{ required: true }]}>
              <Select dropdownRender={dropdownRender}>
                <Select.Option value="demo">Demo</Select.Option>
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
