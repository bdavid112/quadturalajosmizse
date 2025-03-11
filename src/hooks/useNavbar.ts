export const useNavbar = () => {
  const links = [
    { label: 'Home', path: '/' },
    { label: 'About us', path: '/about-us' },
    { label: 'Tours', path: '/tours' },
    { label: 'ATVs', path: '/atvs' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'FAQ', path: '/faq' },
  ]

  return { links }
}
