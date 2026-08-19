import { totalContributions } from '../generated/github-stats';

/**
 * Contribution totals are fetched at build time by scripts/fetch-github-stats.mjs,
 * so no GitHub token ever reaches the browser. Kept async to preserve the call
 * signature About.tsx already uses.
 */
const getContributions = async (): Promise<number> => totalContributions;

export { getContributions };
