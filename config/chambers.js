export const CHAMBERS = {
  crossroads: {
    id: 'crossroads',
    name: 'The Crossroads',
    mapLabel: 'Crossroads',
    path: '/',
    x: 0,
    y: 0,
    ariaLabel: 'The Crossroads, central chamber',
  },
  scriptorium: {
    id: 'scriptorium',
    name: 'The Scriptorium',
    mapLabel: 'Scriptorium',
    path: '/scripture',
    x: 1,
    y: 0,
    ariaLabel: 'The Scriptorium, scripture chamber',
  },
};

export const CHAMBER_LIST = Object.values(CHAMBERS);

export function getChamberFromPath(pathname = '/') {
  const normalizedPath = pathname !== '/' ? pathname.replace(/\/$/, '') : '/';
  return CHAMBER_LIST.find((chamber) => chamber.path === normalizedPath) ?? CHAMBERS.crossroads;
}
