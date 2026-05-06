import Link from 'next/link'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-black text-white">
      <div className="container py-10 grid gap-8 md:grid-cols-2">
        <div className="space-y-2">
          <p className="text-xs tracking-widest text-white/60">[창원사무소]</p>
          <p className="text-lg font-semibold">법무법인 인유</p>
          <p className="text-sm text-white/80">대표변호사 류남경</p>
          <p className="text-sm text-white/80">
            경남 창원시 성산구 창이대로689번길 4-24, 5층 504호
          </p>
          <p className="text-sm text-white/80">상담문의 010-7552-0301</p>
        </div>

        <div className="flex flex-col md:items-end gap-3 text-sm">
          <Link
            href="https://blog.naver.com/inyou2025"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white"
          >
            공식 블로그
          </Link>
          <p className="text-white/50 text-xs">
            © {new Date().getFullYear()} 법무법인 인유 창원사무소. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
