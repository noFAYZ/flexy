import { getCachedUserProfile } from "./cache"

export async function getParallelUserData(username: string) {
    const [
      profile,
      projects,
      workHistory,
      reviews,
      certifications
    ] = await Promise.all([
      getCachedUserProfile(username),
      fetch(`/api/users/${username}/projects`).then(r => r.json()),
      fetch(`/api/users/${username}/work-history`).then(r => r.json()),
      fetch(`/api/users/${username}/reviews`).then(r => r.json()),
      fetch(`/api/users/${username}/certifications`).then(r => r.json())
    ])
    
    return {
      profile,
      projects,
      workHistory,
      reviews,
      certifications
    }
  }