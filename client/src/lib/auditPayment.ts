/**
 * Tony's Stripe payment link for the $149 nutrition audit.
 * One link covers both currencies: Stripe shows NZD 149 with a CAD 149 option.
 * After payment Stripe redirects to /initialize?plan=audit, so the intake form
 * follows checkout on its own. The on-page label stays with money().
 */
export const AUDIT_PAY_URL = "https://buy.stripe.com/14AbJ03Ds7iM09egyy4Rq00";

/**
 * Tony's Cal.com page for booking the audit call. Cal.com's free plan can't
 * redirect after booking, so the intake form's confirmation screen links here.
 */
export const AUDIT_BOOKING_URL = "https://cal.com/tonynguyenfit/audit";
