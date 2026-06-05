import * as React from "react";
import { cn } from "@/lib/utils";
import { AnimatedGhostIcon } from "@/components/not-found/animated-ghost-icon";
import { NotFoundActions } from "@/components/not-found/not-found-actions";

interface NotFound404Props {
  title?: string;
  description?: string;
  className?: string;
}

export default function NotFound404({
  title = "Page Not Found",
  description = "The page you're looking for doesn't exist. It may have been moved or deleted.",
  className,
}: NotFound404Props) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={cn(
        "relative flex min-h-screen w-full scroll-mt-4 items-center justify-center overflow-hidden bg-background px-6",
        className,
      )}
    >
      <div
        data-slot="empty"
        className={cn(
          "flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-xl border-dashed p-6 text-center text-balance md:p-12",
        )}
      >
        <header
          data-slot="empty-header"
          className={cn("flex max-w-sm flex-col items-center text-center")}
        >
          <AnimatedGhostIcon />
          <h1
            data-slot="empty-title"
            className={cn(
              "font-heading text-xl leading-none",
              "bg-linear-to-r from-primary via-primary/80 to-blue-500 bg-clip-text text-4xl font-normal text-transparent",
            )}
          >
            <span className="sr-only">{title}</span>
            <span aria-hidden="true">404</span>
          </h1>
          <p
            data-slot="empty-description"
            className={cn(
              "text-sm/relaxed font-light text-muted-foreground text-pretty [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary [[data-slot=empty-title]+&]:mt-1",
              "text-lg",
            )}
          >
            {description}
          </p>
        </header>
        <div
          data-slot="empty-content"
          className={cn(
            "flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance",
          )}
        >
          <NotFoundActions />
        </div>
      </div>
    </main>
  );
}
