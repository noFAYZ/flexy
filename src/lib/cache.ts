import { cache } from 'react'
import { unstable_cache } from 'next/cache'

export const getCachedUserProfile = cache(async (username: string) => {
  return unstable_cache(
    async () => {
      // Your actual API call here
      const user = {
        // ... your user data
      }
      return user
    },
    [`user-${username}`],
    {
      revalidate: 3600, // 1 hour
      tags: [`user-${username}`]
    }
  )()
})