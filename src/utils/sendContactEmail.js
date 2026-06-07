import emailjs from "@emailjs/browser";
import { contactEmail } from "../data/contact.js";

export async function sendContactEmail({ formData, language, submittedAt }) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error("EmailJS is not configured");
  }

  return emailjs.send(
    serviceId,
    templateId,
    {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone || "Not provided",
      request_type: formData.type,
      subject: formData.subject,
      message: formData.message,
      deadline: formData.deadline || "Not provided",
      budget: formData.budget || "Not provided",
      language,
      submitted_at: submittedAt,
      to_email: contactEmail,
    },
    publicKey,
  );
}
