import Link from 'next/link'
import {
  Building2,
  CarFront,
  FileWarning,
  GraduationCap,
  Landmark,
  LockKeyhole,
  Scale,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'
import type { FC } from 'react'

import { CRIMINAL_LEAVES, type Leaf } from '@/app/(frontend)/services/_data/leaves'
import { MotionReveal } from '@/components/MotionReveal'
import { SectionContainer } from '@/components/SectionContainer'
import { SectionHeader } from '@/components/SectionHeader'
import { cn } from '@/utilities/ui'

const SERVICE_ICONS: Record<string, LucideIcon> = {
  'sex-crime': ShieldCheck,
  'corporate-crime': Building2,
  'property-crime': Landmark,
  'traffic-crime': CarFront,
  'school-violence': GraduationCap,
  'general-criminal': FileWarning,
  'anti-corruption': Scale,
  investigation: LockKeyhole,
}

const ServiceCard: FC<{ leaf: Leaf }> = ({ leaf }) => {
  const Icon = SERVICE_ICONS[leaf.slug] ?? FileWarning

  // stretched-link: 실제 <a> 는 카드 제목만 감싸고, ::after 오버레이가 카드 전체를
  // 클릭 영역으로 확장한다. 앵커 텍스트를 카드 본문 전체가 아닌 label 로 좁히기 위함.
  return (
    <div className="group relative flex h-full flex-col p-6 transition-colors hover:bg-accent/30 has-[a:focus-visible]:bg-accent/30">
      <div className="flex items-center gap-2.5">
        <Icon aria-hidden strokeWidth={1.75} className="size-[1.25rem] shrink-0 text-foreground" />
        <h3 className="text-heading-2 font-semibold">
          <Link href={`/services/${leaf.slug}`} className="after:absolute after:inset-0">
            {leaf.label}
          </Link>
        </h3>
      </div>

      <p className="mt-2 text-body-1 text-muted-foreground">{leaf.description}</p>

      <ul className="mt-5 flex flex-1 flex-wrap content-start gap-2">
        {leaf.subs.map((sub) => (
          <li key={sub}>
            <span className="inline-flex rounded-sm border border-border bg-muted/40 px-2.5 py-1 text-body-1 text-muted-foreground transition-colors group-hover:border-foreground/20 group-hover:bg-background">
              {sub}
            </span>
          </li>
        ))}
      </ul>

      <span className="mt-6 flex items-center justify-between border-t border-border pt-4 text-body-1 font-medium transition-colors group-hover:text-foreground">
        <span>자세히 보기</span>
        <span aria-hidden>→</span>
      </span>
    </div>
  )
}

export const ServicesSection: FC = () => {
  return (
    <SectionContainer id="services" aria-label="업무분야" innerClassName="max-w-5xl">
      <SectionHeader title="업무분야" lead="형사 전 분야에 걸친 깊이있는 경험과 전문성" />

      <ul className="mt-12 grid grid-cols-1 border-x border-t lg:mt-16 lg:grid-cols-2">
        {CRIMINAL_LEAVES.map((leaf, idx) => (
          <MotionReveal key={leaf.slug} asChild delay={(idx % 2) * 70}>
            <li className={cn('border-b', idx % 2 === 0 && 'lg:border-r')}>
              <ServiceCard leaf={leaf} />
            </li>
          </MotionReveal>
        ))}
      </ul>

      <div className="mt-10 text-center lg:mt-12">
        <Link
          href="/services"
          className="text-body-1 font-medium underline-offset-4 hover:underline"
        >
          전체 업무분야 보기 →
        </Link>
      </div>
    </SectionContainer>
  )
}
