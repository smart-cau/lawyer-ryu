import type { FC } from 'react'

import { SectionContainer } from '@/components/SectionContainer'
import { SectionHeader } from '@/components/SectionHeader'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import type { ServiceLeafContent } from '../_data/service-leaf'

type FaqSectionProps = {
  data: ServiceLeafContent['faq']
}

export const FaqSection: FC<FaqSectionProps> = ({ data }) => {
  return (
    <SectionContainer
      id="faq"
      aria-label={data.title}
      innerClassName="space-y-12"
    >
      <SectionHeader title={data.title} />

      <Accordion
        type="single"
        collapsible
        className="mx-auto w-full max-w-4xl"
      >
        {data.items.map((item, idx) => (
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
