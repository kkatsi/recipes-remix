type FetchParams = Parameters<typeof fetch>;

export const fetchWithErrorAndStatus = async <T>(input: FetchParams[0], init?: FetchParams[1]) => {
  let ok = false,
    error = true,
    status,
    body;
  try {
    const response = await fetch(input, init);
    ok = response.ok;
    status = response.status;
    body = await response.json();
    error = false;
  } catch (e) {
    body = e;
  }
  if (!ok) throw { error, status, body };
  return { error, status, body: body as T };
};

const pluralRules = new Intl.PluralRules('en');

export const pluralize = (word: string, count: number) => {
  return pluralRules.select(count) === 'one' ? word : `${word}s`;
};

export const replaceSpacesWithHyphensAndMakeLowercase = (text: string) =>
  text.replaceAll(' ', '-').toLowerCase();

export const isBrowser = () => typeof window !== 'undefined';
