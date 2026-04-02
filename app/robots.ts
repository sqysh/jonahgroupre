import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'facebookexternalhit',
        allow: '/'
      },
      {
        userAgent: '*',
        allow: '/'
      }
    ],
    sitemap: 'https://jonahgroupre.com/sitemap.xml'
  }
}
