import React from "react";
import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { getServerSession } from "@node_modules/next-auth";

export const metadata = {
  title: "Prompt",
  description: "Discover and Share AI prompts",
};

interface RootProps {
    children: React.ReactNode,
}

const RootLayout: React.FC <RootProps> = async ({children}) => {
    const session = await getServerSession();
  return (
    <html lang="en">
      <body>
        <Provider session={session}>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <div className="app">
            <Nav></Nav>
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
