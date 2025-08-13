
"use client"
import { signOut } from "next-auth/react"

export default function SignOut() {
  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div onClick={handleSignOut}>Sign out</div>
  )
}