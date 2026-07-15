function getErrorCode(error: unknown) {
  if (typeof error !== "object" || error === null || !("code" in error)) return undefined;
  return typeof error.code === "string" ? error.code : undefined;
}

export function getRegistrationErrorMessage(error: unknown) {
  switch (getErrorCode(error)) {
    case "email_address_invalid":
      return "Use a real email address you can open. Placeholder or test addresses are not accepted.";
    case "email_address_not_authorized":
      return "Confirmation email delivery is not configured for this address yet. Please contact the site administrator.";
    case "email_exists":
    case "user_already_exists":
      return "An account already exists for this email. Try signing in instead.";
    case "over_email_send_rate_limit":
      return "Too many confirmation emails were requested. Please wait a few minutes and try again.";
    default:
      return error instanceof Error ? error.message : "Unable to create your account.";
  }
}
