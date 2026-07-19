import { useEffect, useState, type ReactNode } from 'react'
import ConnectionError from '../../pages/ConnectionError'

/**
 * When the browser reports offline, cover the app with the connection error design.
 */
export function OfflineGate({ children }: { children: ReactNode }) {
  const [online, setOnline] = useState(() =>
    typeof navigator !== 'undefined' ? navigator.onLine : true
  )

  useEffect(() => {
    const goOnline = () => setOnline(true)
    const goOffline = () => setOnline(false)

    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)

    // Re-check on focus (some browsers are slow to fire events)
    const onFocus = () => setOnline(navigator.onLine)
    window.addEventListener('focus', onFocus)

    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
      window.removeEventListener('focus', onFocus)
    }
  }, [])

  if (!online) {
    return (
      <ConnectionError
        kind="offline"
        standalone
        onRetry={() => {
          if (navigator.onLine) {
            setOnline(true)
            window.location.reload()
          } else {
            // Force re-evaluate
            setOnline(navigator.onLine)
          }
        }}
      />
    )
  }

  return <>{children}</>
}
