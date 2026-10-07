"use client";

import { useState } from "react";
import { Button, TextInput } from "@ruparupa/ui-web";

function UserIcon() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="8" cy="5" r="2.5" />
      <path d="M3 13.5c.6-2.4 2.6-3.6 5-3.6s4.4 1.2 5 3.6" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="7" cy="7" r="4" />
      <path d="M10.2 10.2 13.5 13.5" />
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

export default function Home() {
  const [fullName, setFullName] = useState("");
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");
  const [pressCount, setPressCount] = useState(0);

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f4f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: 32,
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 520,
          backgroundColor: "#ffffff",
          border: "1px solid #e4e4e7",
          borderRadius: 12,
          padding: 32,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <h1 style={{ fontSize: 22, lineHeight: 1.3, margin: 0 }}>
            Next.js (web) — @ruparupa/ui-web
          </h1>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.5,
              margin: 0,
              color: "#52525b",
            }}
          >
            These are the web team&apos;s DOM components. They share tokens and
            props contracts with mobile, rendered as native web elements.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <TextInput
            label="Full name"
            placeholder="Jane Doe"
            leftIcon={<UserIcon />}
            value={fullName}
            onChangeText={setFullName}
          />
          <TextInput
            label="Search"
            placeholder="Search products…"
            leftIcon={<SearchIcon />}
            rightIcon={search !== "" ? <ClearIcon /> : undefined}
            onRightIconPress={
              search !== "" ? () => setSearch("") : undefined
            }
            value={search}
            onChangeText={setSearch}
          />
          <TextInput
            label="Email"
            error="Email is required"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput label="Disabled" disabled value="Read only" />
        </div>

        <div style={{ borderTop: "1px solid #e4e4e7", paddingTop: 16 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              alignItems: "center",
            }}
          >
            <Button
              label={
                pressCount === 0 ? "Submit" : `Submit (${pressCount})`
              }
              onPress={() => setPressCount((c) => c + 1)}
            />
            <Button label="Secondary" variant="secondary" onPress={() => {}} />
            <Button label="Ghost" variant="ghost" onPress={() => {}} />
            <Button label="Disabled" disabled />
          </div>
        </div>
      </div>
    </main>
  );
}
