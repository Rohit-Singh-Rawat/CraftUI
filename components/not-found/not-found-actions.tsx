"use client";

import * as React from "react";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function NotFoundActions() {
  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
      <Button asChild className="btn-default group min-h-11">
        <Link href="/">
          <Home
            className="mr-1 h-4 w-4 transition-transform group-hover:scale-110"
            aria-hidden="true"
          />
          Go Home
        </Link>
      </Button>

      <Button
        onClick={handleBackClick}
        variant="outline"
        className="group min-h-11 active:scale-[0.96] transition-transform"
      >
        <ArrowLeft
          className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1"
          aria-hidden="true"
        />
        Go Back
      </Button>
    </div>
  );
}
