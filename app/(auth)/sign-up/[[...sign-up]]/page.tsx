import { SignUpForm } from "@/components/shared/sign-up-form";


export default function SignUpPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-l">
        <SignUpForm />
      </div>
    </div>
  )
}

