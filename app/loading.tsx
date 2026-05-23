export default function Loading() {
  return (
    <div className="w-screen h-screen bg-zinc-900 flex flex-col items-center justify-center absolute inset-0 z-50">
      <div className="w-12 h-12 border-4 border-[#003A70] border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-white font-semibold animate-pulse">
        Carregando a interface do Campus...
      </p>
    </div>
  );
}
