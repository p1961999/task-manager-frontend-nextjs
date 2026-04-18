import { CheckCircle2 } from "lucide-react";
import { SignUpFormComponent } from "@/components/auth/sign-up-form";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-7xl overflow-hidden rounded-[32px] bg-white shadow-2xl lg:grid-cols-2">
        <div className="hidden bg-gradient-to-br from-blue-500 to-blue-700 p-10 text-white lg:flex">
          <div className="absolute flex items-center gap-3">
            <div className="rounded-full bg-white p-2 text-blue-600">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <span className="text-3xl font-bold">Task Manager</span>
          </div>

          <div className="flex w-full justify-center flex-col">
            <h1 className="text-5xl font-bold leading-tight">
              Start managing
              <br />
              smarter today.
            </h1>
            <p className="mt-4 max-w-md text-lg text-blue-100">
              Create your account and manage tasks with a modern dashboard
              experience.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center p-6 lg:p-12">
          <SignUpFormComponent />
        </div>
      </div>
    </div>
  );
}