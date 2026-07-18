import {
  defaultAtlasMemory,
  type AtlasBriefLength,
  type AtlasCommunicationPreference,
  type AtlasMemory,
} from "./types";

export type AtlasMemoryInput = {
  ownerName?: string | null;
  preferredBriefLength?: string | null;
  preferredCommunication?: string | null;
  emergencyFirst?: boolean | null;
  preferredStartHour?: number | null;
  averageResponseMinutes?: number | null;
} | null | undefined;

function isBriefLength(
  value: unknown
): value is AtlasBriefLength {
  return (
    value === "short" ||
    value === "normal" ||
    value === "detailed"
  );
}

function isCommunicationPreference(
  value: unknown
): value is AtlasCommunicationPreference {
  return (
    value === "call" ||
    value === "text" ||
    value === "email"
  );
}

function clampInteger(
  value: unknown,
  minimum: number,
  maximum: number,
  fallback: number
): number {
  if (
    typeof value !== "number" ||
    !Number.isFinite(value)
  ) {
    return fallback;
  }

  return Math.min(
    maximum,
    Math.max(
      minimum,
      Math.round(value)
    )
  );
}

export function normalizeAtlasMemory(
  memory: AtlasMemoryInput
): AtlasMemory {
  const ownerName =
    typeof memory?.ownerName === "string"
      ? memory.ownerName.trim()
      : "";

  return {
    ownerName:
      ownerName ||
      defaultAtlasMemory.ownerName,

    preferredBriefLength:
      isBriefLength(
        memory?.preferredBriefLength
      )
        ? memory.preferredBriefLength
        : defaultAtlasMemory.preferredBriefLength,

    preferredCommunication:
      isCommunicationPreference(
        memory?.preferredCommunication
      )
        ? memory.preferredCommunication
        : defaultAtlasMemory.preferredCommunication,

    emergencyFirst:
      typeof memory?.emergencyFirst ===
      "boolean"
        ? memory.emergencyFirst
        : defaultAtlasMemory.emergencyFirst,

    preferredStartHour: clampInteger(
      memory?.preferredStartHour,
      0,
      23,
      defaultAtlasMemory.preferredStartHour
    ),

    averageResponseMinutes:
      clampInteger(
        memory?.averageResponseMinutes,
        1,
        1440,
        defaultAtlasMemory.averageResponseMinutes
      ),
  };
}