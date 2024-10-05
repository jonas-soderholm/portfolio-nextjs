// app/components/DarkModeWrapper.tsx
"use client";

import { DarkModeProvider } from "./DarkModeContext";

export default function DarkModeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DarkModeProvider>{children}</DarkModeProvider>;
}
