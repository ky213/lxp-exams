import React, { useEffect } from 'react';
import { Card, Form, Button, Space, Row, Col, Input } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';

export const CreateEditCategory = () => {
  const handleSubmit = (values: {}) => {
    console.log(values);
  };

  return (
    <PageContainer title="Create/Edit Category">
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
    </PageContainer>
  );
};

export default CreateEditCategory;
