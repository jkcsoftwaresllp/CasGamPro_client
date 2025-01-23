export const extractRoundId = (input) => {
  if (!input) return;
  if (typeof input !== "string" || !input.includes("_")) {
    throw new Error(
      "Input must be a string containing at least one underscore."
    );
  }
  const parts = input.split("_");
  return parts[parts.length - 1];
};
