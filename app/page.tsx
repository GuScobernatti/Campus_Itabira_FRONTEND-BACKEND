import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-white">
      <Image
        src="/logo-unifei-grande.png"
        alt="UNIFEI Logo"
        width={170}
        height={170}
        className="mb-8"
      />
      <h1 className="text-5xl font-bold mb-4 tracking-tight">
        Campus Virtual UNIFEI
      </h1>
      <p className="text-zinc-400 mb-10 text-lg max-w-lg text-center">
        Explore a universidade em tempo real através do nosso ambiente
        interativo em 3D.
      </p>

      <Link
        href="/campus"
        className="bg-[#003A70] hover:bg-[#002A55] text-white font-semibold py-4 px-8 rounded-lg shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all duration-300"
      >
        Iniciar Visita
      </Link>
    </main>
  );
}
