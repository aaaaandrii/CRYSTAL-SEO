import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center bg-[#e4e8ef] py-20">
      <Container>
        <div className="mx-auto max-w-lg text-center">
          <p className="text-[80px] font-bold leading-none text-[#5a72be]">404</p>
          <h1 className="mt-4 text-[40px] font-bold leading-none tracking-[-1.2px] text-[#1a1a1a]">
            Page Not Found
          </h1>
          <p className="mt-4 text-[17px] font-semibold leading-[22px] text-[#555]">
            The page you are looking for does not exist or has been moved.
            Please check the URL or navigate back to the homepage.
          </p>
          <div className="mt-8">
            <Button href="/" size="lg">
              Go to Homepage
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
