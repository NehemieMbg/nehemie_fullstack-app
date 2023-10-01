import {
  SquaresPlusIcon,
  UserIcon,
  ChartBarIcon,
  DocumentMagnifyingGlassIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/solid';

const links = [
  { text: 'Add Job', path: '.', icon: <SquaresPlusIcon className="h-5" /> },
  {
    text: 'overview',
    path: 'all-jobs',
    icon: <DocumentMagnifyingGlassIcon className="h-5" />,
  },
  { text: 'Stats', path: 'stats', icon: <ChartBarIcon className="h-5" /> },
  { text: 'My Profile', path: 'profile', icon: <UserIcon className="h-5" /> },
  { text: 'Admin', path: 'admin', icon: <ShieldCheckIcon className="h-5" /> },
];

export default links;
