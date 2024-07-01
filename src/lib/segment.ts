import { AnalyticsBrowser } from '@segment/analytics-next';

const analytics = AnalyticsBrowser.load({ writeKey: process.env.SEGMENT_KEY });
export { analytics };
