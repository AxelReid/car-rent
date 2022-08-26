import {
  ArchiveBoxIcon,
  CloudArrowUpIcon,
  CircleStackIcon,
  LightBulbIcon,
  ArrowUpTrayIcon,
  UserIcon,
  ClipboardDocumentIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline'
import { HomeIcon } from '@heroicons/react/24/solid'

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
        icon: <ArchiveBoxIcon width={24} />,
        path: '/dashboard/rents',
      },
      {
        label: 'Seller Panel',
        icon: <UserIcon width={24} />,
        // path: '/dashboard/create',
        children: [
          {
            label: 'My rentals',
            icon: <DocumentTextIcon width={24} />,
            path: '/dashboard/my-rents',
          },
          {
            label: 'Create Rental',
            icon: <ArrowUpTrayIcon width={24} />,
            path: '/dashboard/create',
          },
        ],
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
