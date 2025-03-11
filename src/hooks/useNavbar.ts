import { useEffect, useState } from 'react'
import { t } from '../utils/translator'

export const useNavbar = (lang: string) => {
  const links = [
    { label: t('ui.navbar.labels.home', lang), path: '/' },
    { label: t('ui.navbar.labels.about-us', lang), path: '/about-us' },
    { label: t('ui.navbar.labels.tours', lang), path: '/tours' },
    { label: t('ui.navbar.labels.quads', lang), path: '/atvs' },
    { label: t('ui.navbar.labels.gallery', lang), path: '/gallery' },
    { label: t('ui.navbar.labels.faq', lang), path: '/faq' },
  ]

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden' // Disable scrolling
    } else {
      document.body.style.overflow = '' // Re-enable scrolling
    }

    return () => {
      document.body.style.overflow = '' // Cleanup on unmount
    }
  }, [isOpen])

  const toggleIsOpen = () => {
    setIsOpen(!isOpen)
  }

  return { isOpen, toggleIsOpen, links }
}
