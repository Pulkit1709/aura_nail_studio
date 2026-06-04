"use client";

import { InlineWidget } from "react-calendly";

export default function BookPage() {
  return (
    <main className="min-h-screen pt-24">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-6">
          Book Your Appointment
        </h1>

        <p className="text-center mb-10">
          Select your preferred date and time.
        </p>

        <InlineWidget
          url="https://calendly.com/pulkitgambhir1709/30min"
          styles={{
            height: "900px",
          }}
        />
      </div>
    </main>
  );
}