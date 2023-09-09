export default function createItemsUrl(
  initialUrl,
  categoryId,
  searchValue,
  sort,
  currentPage
) {
  const url = new URL(initialUrl);
  if (categoryId > 0) url.searchParams.append("category", `${categoryId}`);
  if (searchValue) url.searchParams.append("search", `${searchValue}`);
  url.searchParams.append("sortBy", `${sort.sortProperty}`);
  url.searchParams.append("order", "desc");
  url.searchParams.append("page", `${currentPage}`);
  url.searchParams.append("limit", "8");

  return url;
}
