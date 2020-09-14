import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'dva';
import { useParams, useHistory } from 'umi';
import { Card, Form, Button, Space, Row, Col, Input } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';

import { RootState } from '@/typings';
import { Category, CATEGORIES_ACTIONS } from '@/models/categories';

export interface CreateEditCategoryProps extends RouteComponentProps, StateProps {}

export const CreateEditCategory: React.FC<CreateEditCategoryProps> = ({ categories }) => {
  const { currentCategory, loading } = useSelector((state: RootState) => state.categories);
  const params: { id: string } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (params.id)
      dispatch({
        type: CATEGORIES_ACTIONS.GET_BY_ID,
        payload: params.id,
      });

    return () => {
      dispatch({
        type: CATEGORIES_ACTIONS.RESET,
      });
    };
  }, []);

  const handleSubmit = (values: Omit<Category, 'id'>) => {
    if (params.id)
      dispatch({
        type: CATEGORIES_ACTIONS.UPDATE,
        payload: { id: params.id, ...values },
      });
    else
      dispatch({
        type: CATEGORIES_ACTIONS.CREATE,
        payload: values,
      });
  };

  return (
    <PageContainer title="Create/Edit Category">
      <Card loading={loading}>
        <Row>
          <Col span={12} offset={6}>
            <Form layout="vertical" size="large" onFinish={handleSubmit}>
              <Form.Item
                name="name"
                label="Name"
                initialValue={currentCategory?.name}
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
                initialValue={currentCategory?.description}
                rules={[{ required: true }]}
              >
                <Input.TextArea rows={4} />
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

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(CreateEditCategory);
