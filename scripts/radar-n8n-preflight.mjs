import { validateArticle } from './news-contract.mjs';
import { validateEditorialCover } from './news-image-policy.mjs';
import { verifyRadarPublicationPackage } from './radar-publication-package.mjs';

/** Read-only n8n preflight. This is never an authorization to merge or publish. */
export function validateRadarN8nArtifact({ article, cover, compositionDigest }) {
  const errors = [...validateArticle(article).errors, ...validateEditorialCover(article)];
  try {
    verifyRadarPublicationPackage({ packageVersion: 2, coverAsset: './cover.png', coverSha256: cover?.sha256,
      approval: { compositionDigest }, portalCallback: { compositionDigest } }, article, Buffer.from(cover?.pngBase64 ?? '', 'base64'));
  } catch (error) { errors.push(error.message); }
  return { valid: errors.length === 0, errors };
}

export function validateRadarControlledEligibility({ decision, gates, ...artifact }) {
  const result = validateRadarN8nArtifact(artifact);
  const required = ['sources', 'facts', 'novelty', 'clientClaims', 'content', 'cover', 'siteValidation', 'budget', 'consistency'];
  if (required.some(key => gates?.[key] !== true)) result.errors.push('A critical gate failed or was omitted.');
  if (!['AUTO_PUBLISH', 'READY_FOR_REVIEW'].includes(decision?.outcome) || decision?.eligibility !== 'ELIGIBLE' ||
      decision.score !== artifact.article?.engineScore || !Number.isInteger(decision.score) || decision.failedGates?.length !== 0) result.errors.push('Eligibility/score is inconsistent with the exact article.');
  return { valid: result.errors.length === 0, errors: result.errors, publicationAuthorized: false };
}
