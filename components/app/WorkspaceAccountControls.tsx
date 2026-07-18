"use client";

import { useSyncExternalStore } from "react";
import {
  OrganizationSwitcher,
  UserButton,
} from "@clerk/nextjs";

function subscribe() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export default function WorkspaceAccountControls() {
  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className="h-9 w-40"
      />
    );
  }

  return (
    <div className="flex items-center gap-3">
      <OrganizationSwitcher />
      <UserButton />
    </div>
  );
}