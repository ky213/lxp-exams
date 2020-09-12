import React from 'react';
import { BasicLayoutProps, Settings as LayoutSettings } from '@ant-design/pro-layout';
import { notification } from 'antd';
import { history, RequestConfig } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { ResponseError } from 'umi-request';
import { queryCurrent } from './services/user';
import defaultSettings from '../config/defaultSettings';

export async function getInitialState(): Promise<{
  currentUser?: API.CurrentUser;
  settings?: LayoutSettings;
}> {
  // If it is a login page, do not execute
  if (true) {
    try {
      const currentUser: API.CurrentUser = {
        name: 'Serati Ma',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        userid: '00000001',
        signature: 'Be tolerant to diversity, tolerance is a virtue',
        title: 'Interaction expert',
        group:
          'Ant Financial-XX Business Group-XX Platform Department-XX Technology Department-UED',
        tags: [
          {
            key: '0',
            label: 'Very thoughtful',
          },
          {
            key: '1',
            label: 'Focus on design',
          },
          {
            key: '2',
            label: 'Spicy~',
          },
          {
            key: '3',
            label: 'Long legs',
          },
          {
            key: '4',
            label: 'Chuan Meizi',
          },
          {
            key: '5',
            label: 'Inclusive of all rivers',
          },
        ],
        unreadCount: 11,
        access: 'admin',
      };
      return {
        currentUser,
        settings: defaultSettings,
      };
    } catch (error) {
      history.push('/user/login');
    }
  }
  return {
    settings: defaultSettings,
  };
}

export const layout = ({
  initialState,
}: {
  initialState: { settings?: LayoutSettings; currentUser?: API.CurrentUser };
}): BasicLayoutProps => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    onPageChange: () => {
      // If not logged in, redirect to login
      // if (!initialState?.currentUser?.userid && history.location.pathname !== '/user/login') {
      //   history.push('/user/login');
      // }
    },
    menuHeaderRender: undefined,
    ...initialState?.settings,
  };
};

const codeMessage = {
  200: 'The server successfully returned the requested data.',
  201: 'New or modified data is successful.',
  202: 'A request has entered the background queue (asynchronous task).',
  204: 'The data was deleted successfully.',
  400: 'There was an error in the request sent, and the server did not create or modify data.',
  401: 'The user does not have permission (the token, username, password is wrong).',
  403: 'The user is authorized, but access is forbidden.',
  404: 'The request sent was for a record that did not exist, and the server did not operate.',
  405: 'The request method is not allowed.',
  406: 'The requested format is not available.',
  410: 'The requested resource is permanently deleted and will no longer be available.',
  422: 'When creating an object, a validation error occurred.',
  500: 'An error occurred in the server, please check the server.',
  502: 'Gateway error.',
  503: 'The service is unavailable, and the server is temporarily overloaded or maintained.',
  504: 'The gateway timed out.',
};

/**
 * Exception handler
 */
const errorHandler = (error: ResponseError) => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `Request error ${status}: ${url}`,
      description: errorText,
    });
  }

  if (!response) {
    notification.error({
      description: 'Your network is abnormal and you cannot connect to the server',
      message: 'network anomaly',
    });
  }
  throw error;
};

export const request: RequestConfig = {
  errorHandler,
};
