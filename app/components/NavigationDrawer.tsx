import { store, useHeaderSeletor } from '../lib/redux/store'
import { closeNavigationDrawer } from '../lib/redux/features/headerSlice'
import BlackPageOverlay from './common/BlackPageOverlay'
import Link from 'next/link'
import { headerLinksData } from '../lib/utils/navigation'
import { usePathname } from 'next/navigation'
import useRemoveScroll from '../lib/hooks/useRemoveScroll'

export const NavigationDrawer = () => {
  const pathname = usePathname()
  const { navigationDrawer } = useHeaderSeletor()
  useRemoveScroll(navigationDrawer)
  const onClose = () => store.dispatch(closeNavigationDrawer())

  return (
    <>
      <div onClick={onClose}>
        <BlackPageOverlay open={navigationDrawer} />
      </div>
      <div
        className={`${
          navigationDrawer ? 'translate-x-0' : '-translate-x-[280px]'
        } duration-200 w-[280px] fixed top-0 left-0 bottom-0 z-[100] transition-all bg-[#212121]`}
      >
        <div className="flex flex-col">
          {headerLinksData(pathname).map((link, i) => (
            <Link
              onClick={onClose}
              key={i}
              href={link.linkKey}
              className="text-white text-sm uppercase font-bold py-3 px-4 border-t-[1px] border-[#404040] hover:text-orange-500 duration-200"
            >
              {link.textKey}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
