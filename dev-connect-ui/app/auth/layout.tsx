export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-screen flex flex-col justify-center items-center bg-blue-500">
      {children}
    </main>
  );
}
