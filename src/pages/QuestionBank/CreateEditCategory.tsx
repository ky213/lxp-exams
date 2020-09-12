import React, { useEffect } from 'react';
import { Link } from 'umi';
import { Card, Form, Select, Button, Space, Row, Col, Input } from 'antd';
import { ArrowRightOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';

export const CreateEditCategory = () => {
  const handleSubmit = (values: {}) => {
    console.log(values);
  };

  return (
    <Card>
      <Row>
        <Col span={12} offset={6}>
          <Form layout="vertical" size="large" onFinish={handleSubmit}>
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Description" rules={[{ required: true }]}>
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
                <Button>Cancel</Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Card>
  );
};

export default CreateEditCategory;
