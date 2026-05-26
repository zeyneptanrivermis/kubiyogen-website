import { Container } from "@/components/container";
import { AuthForm } from "@/components/auth-form";

export default function RegisterPage() {
  return (
    <main className="min-h-[85vh] bg-[#f8fafc] flex items-center py-20 relative overflow-hidden">
      {/* Colorful background blobs to make glassmorphism visible */}
      <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-purple-300/40 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[350px] h-[350px] bg-brand-200/40 rounded-full blur-[90px] pointer-events-none" />

      <Container className="max-w-xl relative z-10">
        <AuthForm mode="register" />
      </Container>
    </main>
  );
}
