
import { Button } from "@/components/ui/button"
import { signIn } from "@/auth"
import { FaGithub } from "react-icons/fa";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("github")
      }}
    >
      <Button type="submit" variant="outline" size="sm">
        <FaGithub /> Signin with GitHub
      </Button>
    </form>
  )
}