import test from 'node:test';
import assert from 'node:assert/strict';
import { validateRadarControlledEligibility } from '../../scripts/radar-n8n-preflight.mjs';

test('controlled auto outcome cannot authorize publisher or compensate invalid content',()=>{
 const result=validateRadarControlledEligibility({decision:{outcome:'AUTO_PUBLISH',eligibility:'ELIGIBLE',score:100,failedGates:[]},article:{engineScore:100},cover:{pngBase64:''},compositionDigest:'0'.repeat(64),gates:{sources:false}});
 assert.equal(result.valid,false);assert.equal(result.publicationAuthorized,false);assert.ok(result.errors.some(error=>error.includes('critical gate')));
});
