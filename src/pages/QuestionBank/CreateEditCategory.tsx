import React, { useEffect } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { connect } from 'dva';
import { useParams, useHistory } from 'umi';
import { Card, Form, Button, Space, Row, Col, Input } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';

import { RootState } from '@/typings';
import { Category, ACTIONS } from '@/models/categories';

export interface CreateEditCategoryProps extends StatProps {}

export const CreateEditCategory = ({ categories }: CreateEditCategoryProps) => {
  const { currentCategory } = useSelector((state: RootState) => state.categories);
  const dispatch = useDispatch();
  const params: { id: string } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (params.id)
      dispatch({
        type: ACTIONS.GET_BY_ID,
        payload: params.id,
      });
  }, []);

  const handleSubmit = (values: Omit<Category, 'id'>) => {
    if (params.id)
      dispatch({
        type: ACTIONS.UPDATE,
        payload: { id: params.id, ...values },
      });
    else
      dispatch({
        type: ACTIONS.CREATE,
        payload: values,
      });

    console.log('PARAMS::::', params);
  };

  return (
    <PageContainer title="Create/Edit Category">
      <Card>
        <Row>
          <Col span={12} offset={6}>
            <Form layout="vertical" size="large" onFinish={handleSubmit}>
              <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input defaultValue={currentCategory?.name} />
              </Form.Item>
              <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                <Input.TextArea rows={4} defaultValue={currentCategory?.description} />
              </Form.Item>
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit" loading={categories.loading}>
                    Save
                  </Button>
                  <Button onClick={() => history.goBack()}>Cancel</Button>
                </Space>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Card>
    </PageContainer>
  );
};

const mapStateToProps = ({ categories }: RootState) => ({
  categories,
});

type StatProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(CreateEditCategory);
