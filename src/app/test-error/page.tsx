'use client';

export default function TestErrorPage() {
  // Method 1: Throw error immediately
  throw new Error("This is a test error message");

  // OR Method 2: Button to trigger error
  return (
    <button 
      onClick={() => {
        throw new Error("This is a test error message");
      }}
    >
      Trigger Error
    </button>
  );
} 