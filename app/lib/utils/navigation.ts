import { HeaderLinkProps } from '../types/header-types'

export const headerLinksData = (path: string): HeaderLinkProps[] => [
  {
    textKey: 'Home',
    linkKey: '/',
    active: path === '/'
  },
  {
    textKey: 'Eileen Jonah',
    linkKey: '/eileen-jonah',
    active: path === '/eileen-jonah'
  },
  {
    textKey: 'Listings',
    linkKey: '/listings?page=1&county=Essex',
    active: path.includes('/listing') && !path.includes('/sold')
  },
  {
    textKey: 'Sold',
    linkKey: '/sold',
    active: path.includes('/sold')
  },
  {
    textKey: 'Services',
    linkKey: '/services',
    active: path === '/services'
  },
  {
    textKey: 'Contact',
    linkKey: '/contact',
    active: path === '/contact'
  }
]
