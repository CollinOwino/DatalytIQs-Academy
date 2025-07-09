import { Html, Head, Main, NextScript } from 'next/document';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'DatalytIQs Academy',
  description: 'Your virtual bootcamp in math, economics and finance',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    
        <div className={inter.className}>
          {children}
        </div>
      
  )
}
