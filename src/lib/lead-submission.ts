import type { LeadState } from "./lead-schema";
import type { DeliveryResult, SavedLead } from "./deliver-lead";

type DeliverLead = (lead: SavedLead) => Promise<DeliveryResult>;

export async function finalizeLeadSubmission(
  lead: SavedLead,
  deliver: DeliverLead,
): Promise<LeadState> {
  const result = await deliver(lead);

  if (result.ok) {
    console.info("Project request delivered", {
      leadId: lead.id,
      provider: "resend",
      messageId: result.messageId,
      requestId: result.requestId,
    });
    return {
      success: true,
      message:
        "Your project request has been sent. Thank you for telling us about your business.",
    };
  }

  console.error("Project request delivery failed", {
    leadId: lead.id,
    provider: "resend",
    reason: result.reason,
    status: result.status,
    requestId: result.requestId,
    providerCode: result.providerCode,
    missing: result.missing,
  });
  return {
    success: false,
    message:
      "Your request could not be sent. Please try again or email operations@reachorbital.tech.",
  };
}
