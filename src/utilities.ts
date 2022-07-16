export const fetcher = async (url: string) => {
  const response = await fetch(url);
  const jsonResponse = await response.json();
  return jsonResponse;
};

export const makeQueryString = (params: Record<string, any>) => {
  return new URLSearchParams(params).toString();
};
