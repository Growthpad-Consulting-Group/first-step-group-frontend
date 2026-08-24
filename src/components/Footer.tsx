export default function Footer() {
  return (
    <footer className="border-t border-black/5 dark:border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-zinc-500">
          © {new Date().getFullYear()} Aurea. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm text-zinc-500">
          <span>Shipping</span>
          <span>Returns</span>
          <span>Contact</span>
        </div>
      </div>
    </footer>
  );
}
