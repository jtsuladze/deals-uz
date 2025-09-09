'use client'

import Link from 'next/link'
import { usePathname, useParams } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()
  const params = useParams()
  const locale = params.locale as string

  const isActive = (path: string) => {
    if (path === `/${locale}/marketplace`) {
      return pathname === `/${locale}/marketplace` || pathname === `/${locale}`
    }
    return pathname === path
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href={`/${locale}/marketplace`} className="text-xl font-bold text-gray-900">
              DealsUZ
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            <Link
              href={`/${locale}/marketplace`}
              className={`text-sm font-medium ${
                isActive(`/${locale}/marketplace`)
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Marketplace
            </Link>
            
            <Link
              href={`/${locale}/favorites`}
              className={`text-sm font-medium ${
                isActive(`/${locale}/favorites`)
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Favorites
            </Link>
            
            <Link
              href={`/${locale}/messages`}
              className={`text-sm font-medium ${
                isActive(`/${locale}/messages`)
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Messages
            </Link>
            
            <Link
              href={`/${locale}/profile`}
              className={`text-sm font-medium ${
                isActive(`/${locale}/profile`)
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
