import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-10 sm:flex-row sm:justify-between sm:px-8">
        <div className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
          <Image src="/logo-mark.png" alt="" width={20} height={20} className="size-5 rounded-full object-cover" />
          SubSentry
        </div>
        <nav aria-label="Legal" className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="/privacy" className="transition-colors hover:text-foreground">
            Privacy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-foreground">
            Terms
          </Link>
        </nav>
      </div>
    </footer>
  );
}
