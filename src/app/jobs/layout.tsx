export default function JobsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full">
      <div className="fixed inset-0 bg-gradient-to-br from-orange-500/5 via-pink-500/5 to-purple-500/5 -z-10">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
      </div>
      {children}
    </div>
  );
} 