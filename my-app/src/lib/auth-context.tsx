import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from './supabase'
import { AuthContextType, AuthState } from '@/types/auth'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
  })

  useEffect(() => {
    console.log('AuthProvider: Initializing...')
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      console.log('AuthProvider: Session loaded:', session?.user?.email || 'no session', error?.message || '')
      setState((prev) => ({
        ...prev,
        session,
        user: session?.user ?? null,
        loading: false,
      }))
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        console.log('AuthProvider: Auth state changed:', _event, session?.user?.email || 'no user')
        setState((prev) => ({
          ...prev,
          session,
          user: session?.user ?? null,
        }))
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    console.log('AuthProvider: Signing in with:', email)
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    console.log('AuthProvider: Sign in result:', data?.user?.email || 'no user', error?.message || 'success')
    return { error }
  }

  const signUp = async (email: string, password: string) => {
    console.log('AuthProvider: Signing up with:', email)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    console.log('AuthProvider: Sign up result:', data?.user?.email || 'no user', error?.message || 'success')
    return { error }
  }

  const signOut = async () => {
    console.log('AuthProvider: Signing out')
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ ...state, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
