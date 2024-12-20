"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/openSans.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import { AppProvider } from './Contexts';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {




  return (
    <html lang="en">
      <head><title>Quản lý toàn chung cư</title></head>
      <body suppressHydrationWarning={true}>
        <ToastContainer/>
        <AppProvider>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {children}
        </div>
        </AppProvider>
      </body>
    </html>
  );
}
