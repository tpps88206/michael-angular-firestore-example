import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: '儀表板',
    icon: 'nb-e-commerce',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: '功能列表',
    group: true,
  },
  {
    title: '裝潢預算',
    icon: 'nb-home',
    link: '/pages/decorate',
  },
  {
    title: '統計資訊',
    icon: 'nb-bar-chart',
    link: '/pages/statistics',
  },
  {
    title: '帳目清單',
    icon: 'nb-tables',
    link: '/pages/list',
  },
];
