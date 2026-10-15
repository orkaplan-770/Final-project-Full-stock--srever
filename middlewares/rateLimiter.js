import rateLimit from 'express-rate-limit';
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: 'אנא נסה שוב מאוחר יותר.' }
});
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: { message: 'יותר מדי ניסיונות התחברות, נסה שוב מאוחר יותר.' }
});