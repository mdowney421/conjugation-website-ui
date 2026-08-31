// JSON.stringify doesn't escape "<", so a value containing "</script>"
// would close the tag early when dropped into dangerouslySetInnerHTML.
// Escaping "<" as a unicode sequence keeps the JSON valid while making
// that impossible.
export const jsonLdScript = (data: unknown): string =>
  JSON.stringify(data).replace(/</g, "\\u003c");
