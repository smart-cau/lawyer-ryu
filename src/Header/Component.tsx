import Link from 'next/link'

const navItems: { label: string; href: string }[] = [
  { label: '변호사 소개', href: '/profile' },
  { label: '업무분야', href: '/services' },
  { label: '성공사례', href: '/cases' },
  { label: '상담문의', href: '/contact' },
]

export function Header() {
  return (
    <header className="container relative z-20">
      <div className="py-6 flex items-center justify-between gap-6">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-xs tracking-widest text-muted-foreground">[창원사무소]</span>
          <span className="text-lg font-semibold">법무법인 인유</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-primary transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href="tel:010-7552-0301"
          className="inline-flex items-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90"
        >
          상담문의 010-7552-0301
        </a>
      </div>
    </header>
  )
}
