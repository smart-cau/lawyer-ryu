import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="container flex min-h-[60vh] flex-col items-start justify-center gap-6 py-24">
      <div className="flex flex-col gap-3">
        <p className="text-sm tracking-widest text-muted-foreground">404 NOT FOUND</p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          요청하신 페이지를 찾을 수 없습니다
        </h1>
        <p className="text-base text-muted-foreground">
          주소가 잘못 입력되었거나, 페이지가 이동·삭제되었을 수 있습니다.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button asChild>
          <Link href="/">홈으로 이동</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/cases">성공사례 보기</Link>
        </Button>
      </div>
    </main>
  )
}
