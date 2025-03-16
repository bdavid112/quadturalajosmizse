const icons = import.meta.glob<{
  default: React.FC<React.SVGProps<SVGSVGElement>>
}>('/src/assets/icons/*.svg', { eager: true, query: '?react' })

export default function Icon({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const SvgIcon = icons[`/src/assets/icons/${name}.svg`]?.default

  if (!SvgIcon) {
    console.warn(`Icon "${name}" not found`)
    return null
  }

  return <SvgIcon className={`icon ${className}`} />
}
