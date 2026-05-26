import type { FC } from 'react'

import { FAQ_ITEMS } from '@/app/(frontend)/services/sex-crime/_data/faq'
import { SectionContainer } from '@/components/SectionContainer'
import { SectionHeader } from '@/components/SectionHeader'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export const FaqSection: FC = () => {
  return (
    <SectionContainer
      id="faq"
      aria-label="자주 묻는 질문"
      innerClassName="space-y-12"
    >
      <SectionHeader title="자주 묻는 질문" />

      <Accordion
        type="single"
        collapsible
        className="mx-auto w-full max-w-4xl"
      >
        {FAQ_ITEMS.map((item, idx) => (
          <AccordionItem key={item.question} value={String(idx)}>
            <AccordionTrigger className="py-6 text-left text-headline-1 font-medium">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="pb-6 text-body-1 text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </SectionContainer>
  )
}
