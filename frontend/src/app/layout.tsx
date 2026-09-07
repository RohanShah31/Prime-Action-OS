"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4dabf5',
    },
    background: {
      default: '#0a1929',
      paper: '#001e3c',
    },
  },
  typography: {
    fontFamily: 'var(--font-inter), sans-serif',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: '0px 4px 20px rgba(0,0,0,0.5)',
          borderRadius: 12,
          border: '1px solid rgba(255, 255, 255, 0.05)',
        }
      }
    }
  }
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        <title>PrimeActionOS™ — Executive Command Center</title>
        <meta name="description" content="AI-Powered Financial Intelligence Platform" />
      </head>
      <body className="min-h-full flex flex-col bg-[#0a1929] text-white">
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
