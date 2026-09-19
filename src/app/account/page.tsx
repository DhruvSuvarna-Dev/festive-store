import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { logout } from '@/app/(auth)/actions'
import { Button } from '@/components/ui/button'

export default async function AccountPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single<any>()

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <div className="bg-card text-card-foreground rounded-xl border shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
        <div className="space-y-2">
          <p><span className="font-medium">Name:</span> {profile?.full_name || 'N/A'}</p>
          <p><span className="font-medium">Email:</span> {profile?.email}</p>
          <p><span className="font-medium">Role:</span> {profile?.role}</p>
        </div>
      </div>

      <form action={logout}>
        <Button variant="destructive">Logout</Button>
      </form>
    </div>
  )
}
