import { HomeIcon, LightBulbIcon } from '@heroicons/react/solid'

export const dashboardLinks = [
  {
    label: 'main menu',
    links: [
      {
        label: 'Home',
        icon: <HomeIcon width={24} />,
        path: '/dashboard',
      },
      {
        label: 'Car Rent',
        icon: <LightBulbIcon width={24} />,
        path: '/dashboard/rents',
      },
      {
        label: 'Insight',
        icon: <LightBulbIcon width={24} />,
        path: '/dashboard/rents',
      },
      {
        label: 'Reimburse',
        icon: <LightBulbIcon width={24} />,
        path: '/dashboard/rents',
      },
      {
        label: 'Inbox',
        icon: <LightBulbIcon width={24} />,
        path: '/dashboard/rents',
      },
      {
        label: 'Calendar',
        icon: <LightBulbIcon width={24} />,
        path: '/dashboard/rents',
      },
    ],
  },
  {
    label: 'preferences',
    links: [
      {
        label: 'Setting',
        icon: <LightBulbIcon width={24} />,
        path: '/dashboard/setting',
      },
      {
        label: 'Help Center',
        icon: <LightBulbIcon width={24} />,
        path: '/dashboard/rents',
      },
    ],
  },
]
