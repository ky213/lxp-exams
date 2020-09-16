import { Settings as LayoutSettings } from '@ant-design/pro-layout';

export default {
  navTheme: 'light',
  primaryColor: '#1890ff',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  menu: {
    locale: true,
  },
  title: 'LXP-Exams',
  pwa: false,
  iconfontUrl: '',
  headerRender: false,
} as LayoutSettings & {
  pwa: boolean;
};
