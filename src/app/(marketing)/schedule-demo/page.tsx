import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import { SITE_URL } from '@/lib/constants';
import ScheduleDemoForm from './ScheduleDemoForm';

export const metadata: Metadata = {
  title: 'Schedule a Demo',
  description:
    'Book a personalised demonstration of 5D Memory Crystal technology and discover how eternal storage can serve your needs.',
  alternates: {
    canonical: `${SITE_URL}/schedule-demo`,
  },
};

export default function ScheduleDemoPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#e4e8ef] py-20 md:py-[88px]">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-[40px] font-bold leading-none tracking-[-1.2px] text-[#1a1a1a] lg:text-[60px]">
              Schedule a Demo
            </h1>
            <p className="mx-auto mt-4 max-w-[500px] text-[17px] font-semibold leading-[22px] text-[#555]">
              See 5D Memory Crystal technology in action. Our specialists will walk you through the encoding process, answer your questions, and help you find the right solution.
            </p>
          </div>
        </Container>
      </section>

      {/* Form Section */}
      <section className="bg-white py-20 md:py-[88px]">
        <Container>
          <div className="mx-auto max-w-2xl">
            <ScheduleDemoForm />
          </div>
        </Container>
      </section>
    </>
  );
}
