import { Inter } from "next/font/google";
import "./ui/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cardlet",
  description: "Generated by create next app",
};

export const viewport = {
  viewport: "width=device-width, initial-scale=1"
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: neobrutalism,
        variables: { colorPrimary: "#6a5acd" },
      }}
    >
      <html lang="en">
        <head>
          <link rel="manifest" href="/manifest.json" />
        </head>
        <body className={inter.className}>{children}</body>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.min.js"></Script>
      </html>
    </ClerkProvider>
    
  );
}