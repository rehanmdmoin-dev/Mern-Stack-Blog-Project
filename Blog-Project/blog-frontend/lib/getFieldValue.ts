// Category/tag/author fields on a Blog can arrive as either a populated
// object or a bare ObjectId string depending on the endpoint. These helpers
// read them safely either way.
export function getName(field: any, fallback = "") {
  if (!field) return fallback;
  if (typeof field === "string") return fallback;
  return field.name || fallback;
}

export function getId(field: any) {
  if (!field) return "";
  if (typeof field === "string") return field;
  return field._id || "";
}
