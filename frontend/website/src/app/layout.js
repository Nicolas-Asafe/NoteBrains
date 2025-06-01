import '../styles/globals.css'; // ✅ correto se está dentro da mesma pasta

export const metadata = {
  title: 'Meu App',
  description: 'App poderoso demais',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
