import AuthForm from './_components/auth-form'

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="px-8 pt-7">
        <span className="text-sm font-normal text-neutral-300 tracking-tight">
          kianmoradpour
        </span>
      </header>
      <section className="flex-1 flex items-center justify-center px-4">
        <AuthForm />
      </section>
    </main>
  )
}
