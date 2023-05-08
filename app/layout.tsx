import "@styles/global.css";
import { ReactNode } from "react";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
interface RootLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
