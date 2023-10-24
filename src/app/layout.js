"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import React, { useState, useEffect } from "react";
import { AppConfig, UserSession } from "@stacks/connect";
import Navbar from "./components/Navbar";
import { UserContext } from "./UserContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [userData, setUserData] = useState({});

  const appConfig = new AppConfig();
  const userSession = new UserSession({ appConfig });

  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        console.log(userData);
        setUserData(userData);
      });
    } else if (userSession.isUserSignedIn()) {
      console.log(userSession.loadUserData());

      setUserData(userSession.loadUserData());
    }
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen text-white bg-slate-800">
          {userData !== undefined ? (
            <UserContext.Provider value={{ userData, userSession }}>
              <Navbar
                userSession={userSession}
                userData={userData}
                setUserData={setUserData}
              />
              {children}
            </UserContext.Provider>
          ) : (
            ""
          )}
        </div>
      </body>
    </html>
  );
}
