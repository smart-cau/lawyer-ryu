import Link from 'next/link'
import type { FC } from 'react'

import { SectionContainer } from '@/components/SectionContainer'

const DESCRIPTIONS = [
  '경찰조사 기록은 이후 수사와 재판에 큰 영향을 끼칩니다.',
  '한 번 잘못 남은 진술은 바로 잡기 어려울 수 있습니다.',
  '조사 과정 중 억울한 일을 겪지 않도록 19년 경력 검사 출신 류남경 변호사가 도와드리겠습니다.',
]

export const InvestigationSection: FC = () => {
  return (
    <SectionContainer
      id="investigation"
      aria-label="시급성 후크 — 첫 경찰 조사 대응"
      backgroundImage="linear-gradient(180deg, rgba(5, 9, 15, 0.28) 0%, rgba(5, 9, 15, 0.42) 46%, rgba(5, 9, 15, 0.62) 100%), url('/backgrounds/interrogation-room-handcuffs.png')"
      className="isolate overflow-hidden text-center text-white"
      innerClassName="max-w-[86rem] py-20 sm:py-24 lg:py-28"
      background={
        <>
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(255,255,255,0.2),rgba(255,255,255,0)_30%)]"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#05090f]/65 via-[#05090f]/18 to-transparent"
          />
        </>
      }
    >
      <h2 className="mx-auto max-w-3xl text-title-1 font-semibold text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.74)]">
        경찰 조사를 앞두고 계신가요?
        <br />
        첫 진술 전, 형사 전문 변호사와 상의하세요.
      </h2>

      <div className="mx-auto mt-6 max-w-3xl space-y-2">
        {DESCRIPTIONS.map((text, index) => (
          <p
            key={index}
            className="text-headline-1 font-medium text-white/90 drop-shadow-[0_1px_10px_rgba(0,0,0,0.82)]"
          >
            {text}
          </p>
        ))}
      </div>

      <div className="mt-8">
        <Link
          href="/services/investigation"
          className="inline-flex items-center justify-center rounded-md border border-white/35 bg-black/28 px-5 py-3 text-body-1 font-semibold text-white shadow-lg shadow-black/25 backdrop-blur-sm transition duration-200 hover:border-white/55 hover:bg-black/38 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          조사·구속 대응 상세 보기 →
        </Link>
      </div>
    </SectionContainer>
  )
}
