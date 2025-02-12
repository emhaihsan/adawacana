import { useAccount } from 'wagmi'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function useWalletStatus() {
  const { isConnected, address } = useAccount()
  const router = useRouter()

  useEffect(() => {
    if (isConnected) {
      router.push('/dashboard')
    } else {
      router.push('/')
    }
  }, [isConnected, router])

  return { isConnected, address }
}
