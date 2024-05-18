'use client';

import {
  UserGroupIcon,
  PowerIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  {
    name: '情绪日记',
    href: '/diary/record',
    icon: DocumentDuplicateIcon,
  },
  { name: '网络仇人', href: '/diary/haters', icon: UserGroupIcon },
  { name: '情绪分析', href: '/diary', icon: PowerIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex grow items-center justify-center gap-2 rounded-md bg-violet-100 p-2 text-sm ',
              {
                'bg-violet-200 text-violet-800': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-4" />
            {link.name}
          </Link>
        );
      })}
    </>
  );
}
