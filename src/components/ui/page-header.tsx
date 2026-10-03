import { Container } from "./container";

/** Title block shared by every inner page of the public site. */
export function PageHeader({ title, intro }: { title: string; intro?: string }) {
  return (
    <header className="border-b border-line bg-surface">
      <Container className="py-14 sm:py-20">
        <h1 className="max-w-3xl text-4xl font-semibold sm:text-5xl">{title}</h1>
        {intro ? <p className="mt-5 max-w-2xl text-lg text-steel">{intro}</p> : null}
      </Container>
    </header>
  );
}
