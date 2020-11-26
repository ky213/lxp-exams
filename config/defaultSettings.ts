import { Settings as LayoutSettings } from '@ant-design/pro-layout';

export default {
  navTheme: 'dark',
  primaryColor: '#1eb7ff',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  menu: {
    locale: false,
  },
  title: 'LXP-Exams',
  pwa: false,
  iconfontUrl: '',
  headerRender: false,
} as LayoutSettings & {
  pwa: boolean;
};
