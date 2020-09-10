import React from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    copyright="2020 Alwasaet"
    links={[
      {
        key: 'Alwasaet',
        title: 'Alwasaet',
        href: 'http://www.alwasaet.com/',
        blankTarget: true,
      },
    ]}
  />
);
