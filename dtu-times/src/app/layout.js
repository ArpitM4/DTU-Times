import "./globals.css";
import { ThemeProvider } from '../context/ThemeContext';
import { AuthProvider } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NewsletterWrapper from '../components/NewsletterWrapper';

export const metadata = {
  title: 'DTU Times',
  description: 'Manage and showcase DTU Times digital magazine editions',
}

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <head>
        {/* Google Fonts: Montserrat, Lora, Playfair Display */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;500&family=Poppins:wght@400;600;700&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;600&display=swap" rel="stylesheet"/>

        <link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;700&family=Montserrat:wght@400;700&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          <ThemeProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
              <NewsletterWrapper />
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
