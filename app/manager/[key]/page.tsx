import { notFound } from 'next/navigation'
import ManagerPortal from '@/components/ManagerPortal'

interface PageProps {
  params: Promise<{
    key: string
  }>
}

export default async function ManagerPage({ params }: PageProps) {
  const { key } = await params
  const secretKey = process.env.MANAGER_SECRET_KEY

  // Validate secret key
  if (!secretKey || key !== secretKey) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-svt-dark mb-2">
            Chef-portal
          </h1>
          <p className="text-gray-600">
            Skapa personliga onboarding-sidor för nya medarbetare
          </p>
        </div>

        <ManagerPortal />
      </div>
    </main>
  )
}
