import { useTranslations } from 'next-intl';
import { SectionContainer } from "@/components/layout/SectionContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export default function ServicePage({ params }: { params: { slug: string } }) {
  const t = useTranslations('Services');
  const { slug } = params;

  // Map slugs to translation keys
  const serviceKey = slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <div className="pt-24 pb-16">
      <SectionContainer>
        <AnimatedSection>
          <SectionHeader
            eyebrow={t('Eyebrow')}
            heading={t(serviceKey as Parameters<typeof t>[0])}
            subtext={t(`${serviceKey}Description` as Parameters<typeof t>[0])}
            align="center"
          />
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="mt-16 max-w-3xl mx-auto prose prose-neutral prose-lg">
            <p className="text-text-secondary leading-relaxed">
              {t(`${serviceKey}LongDescription` as Parameters<typeof t>[0])}
            </p>
            
            <div className="mt-12 p-8 bg-surface-subtle rounded-xl border border-border">
              <h3 className="text-xl font-bold text-text-primary mb-4">{t('ServiceTimes')}</h3>
              <p className="text-text-secondary">
                {t('DefaultServiceTime')}
              </p>
            </div>
          </div>
        </AnimatedSection>
      </SectionContainer>
    </div>
  );
}
