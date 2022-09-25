import { useLocation, matchPath } from 'react-router-dom';

export const useRouteMatch = (patterns: readonly string[]) => {
  const { pathname } = useLocation();
  const similar = patterns.find((url) => pathname.includes(url) && url !== '/' && url !== 'new');

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch.pattern.path;
    }
  }

  return similar;
};
