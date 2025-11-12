import arcjet, {
  detectBot,
  protectSignup,
  shield,
  tokenBucket,
  validateEmail
} from "@arcjet/node";

export const aj = arcjet({
  key: process.env.ARCJET_KEY!, // MUST be set in Render dashboard
  rules: [
    // ✅ Detect bots (based on your docs)
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE", // allow Google/Bing
      ],
    }),

    // ✅ Protect Signup (exact doc format)
    protectSignup({
      email: {
        mode: "LIVE",
        block: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
      },
      bots: {
        mode: "LIVE",
        allow: [], // block all bots on signup
      },
      rateLimit: {
        mode: "LIVE",
        interval: "10m",
        max: 5,
      },
    }),

    // ✅ Email validation (optional extra)
    validateEmail({
      mode: "LIVE",
      deny: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
    }),

    // ✅ Shield protection (SQL injection, abuse)
    shield({
      mode: "LIVE",
    }),

    // ✅ Rate limiting (token bucket)
    tokenBucket({
      mode: "LIVE",
      characteristics: ["ip"],
      refillRate: 5,
      interval: 10,
      capacity: 10,
    }),
  ],
});
