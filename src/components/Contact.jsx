import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FiCalendar, FiDollarSign, FiFileText, FiList, FiMail, FiMessageSquare, FiPhone, FiSend, FiUser } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext.jsx";
import { contactData } from "../data/contact.js";
import { sendContactEmail } from "../utils/sendContactEmail.js";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  type: "",
  subject: "",
  message: "",
  deadline: "",
  budget: "",
  botcheck: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const namePattern = /^[A-Za-zÀ-ÿ\u0600-\u06FF\s'-]{3,60}$/;
const phonePattern = /^\+?[0-9\s]{8,15}$/;
const messageMaxLength = 1000;

function sanitize(value) {
  return value.trim().replace(/[<>]/g, "");
}

function ContactField({ icon: Icon, label, error, children, index }) {
  return (
    <motion.label
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ delay: index * 0.04, duration: 0.42 }}
      className="block"
    >
      <span className="mb-2 flex items-center gap-2 text-sm font-extrabold text-slate-800 dark:text-slate-100">
        <Icon className="text-cyan-600 dark:text-cyan-300" aria-hidden="true" />
        {label}
      </span>
      {children}
      {error && <span className="mt-2 block text-sm font-semibold text-red-600 dark:text-red-300">{error}</span>}
    </motion.label>
  );
}

export default function Contact() {
  const { language, dir } = useLanguage();
  const copy = contactData[language];
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);

  const sanitizedForm = useMemo(
    () => ({
      name: sanitize(formData.name),
      email: sanitize(formData.email).toLowerCase(),
      phone: sanitize(formData.phone),
      type: sanitize(formData.type),
      subject: sanitize(formData.subject),
      message: sanitize(formData.message),
      deadline: sanitize(formData.deadline),
      budget: sanitize(formData.budget),
      botcheck: formData.botcheck,
    }),
    [formData],
  );

  function updateField(field, value) {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function validate() {
    const nextErrors = {};
    if (!namePattern.test(sanitizedForm.name)) nextErrors.name = copy.validation.name;
    if (!emailPattern.test(sanitizedForm.email)) nextErrors.email = copy.validation.email;
    if (sanitizedForm.phone && !phonePattern.test(sanitizedForm.phone)) nextErrors.phone = copy.validation.phone;
    if (!sanitizedForm.type) nextErrors.type = copy.validation.type;
    if (sanitizedForm.subject.length < 5 || sanitizedForm.subject.length > 100) nextErrors.subject = copy.validation.subject;
    if (sanitizedForm.deadline) {
      const today = new Date().toISOString().split("T")[0];
      if (sanitizedForm.deadline < today) nextErrors.deadline = copy.validation.deadline;
    }
    if (sanitizedForm.budget && Number(sanitizedForm.budget) < 0) nextErrors.budget = copy.validation.budget;
    if (sanitizedForm.message.length < 20 || sanitizedForm.message.length > messageMaxLength) nextErrors.message = copy.validation.message;
    return nextErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSending) return;
    if (sanitizedForm.botcheck) return;

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSending(true);

    const submittedAt = new Date().toLocaleString(language === "ar" ? "ar-TN" : language === "fr" ? "fr-FR" : "en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    try {
      await sendContactEmail({
        formData: sanitizedForm,
        language: copy.languageName,
        submittedAt,
      });
      setFormData(initialForm);
      toast.success(copy.success, { autoClose: 2500 });
    } catch (error) {
      toast.error(error.message === "EmailJS is not configured" ? copy.configurationError : copy.error, { autoClose: 2500 });
    } finally {
      setIsSending(false);
    }
  }

  const inputClass =
    "field min-h-12 rounded-2xl border-slate-300/60 bg-white/80 font-semibold text-slate-900 shadow-sm focus:border-cyan-400 focus:shadow-cyan-400/15 dark:border-white/10 dark:bg-white/5 dark:text-white";
  const today = new Date().toISOString().split("T")[0];

  return (
    <section id="contact" dir={dir} className="bg-slate-50 dark:bg-navy/80">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="grid items-start gap-8 lg:grid-cols-[0.82fr_1.18fr]"
        >
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="relative overflow-hidden rounded-3xl p-2 lg:sticky lg:top-28"
          >
            <div className="absolute -left-12 top-8 h-32 w-32 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-300/10" />
            <div className="absolute bottom-6 right-4 h-24 w-24 rounded-full bg-violet-400/20 blur-3xl dark:bg-violet-400/10" />
            <div className="relative border-s-4 border-cyan-400 ps-6">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-300">{copy.title}</p>
              <h2 className="max-w-xl text-3xl font-bold leading-tight text-slate-950 dark:text-white md:text-5xl">{copy.title}</h2>
              <p className="mt-5 max-w-xl leading-8 text-slate-700 dark:text-slate-200">{copy.subtitle}</p>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.58, delay: 0.12 }}
            onSubmit={handleSubmit}
            noValidate
            whileHover={{ y: -4 }}
            className="glass glow-border relative overflow-hidden rounded-3xl p-6 shadow-2xl shadow-blue-500/10 transition duration-300 hover:shadow-violet-500/15 dark:shadow-black/25 dark:hover:shadow-cyan-500/10 md:p-8"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-violet-600" />
            <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-cyan-300/15 blur-3xl dark:bg-cyan-300/10" />
            <div className="pointer-events-none absolute -bottom-28 -left-24 h-64 w-64 rounded-full bg-violet-400/15 blur-3xl dark:bg-violet-400/10" />
            <input
              type="text"
              name="botcheck"
              tabIndex="-1"
              autoComplete="off"
              value={formData.botcheck}
              onChange={(event) => updateField("botcheck", event.target.value)}
              className="hidden"
              aria-hidden="true"
            />

            <div className="relative grid gap-5 md:grid-cols-2">
              <ContactField icon={FiUser} label={copy.fields.name} error={errors.name} index={0}>
                <input className={inputClass} value={formData.name} onChange={(event) => updateField("name", event.target.value)} placeholder={copy.placeholders.name} type="text" autoComplete="name" minLength={3} maxLength={60} pattern="[A-Za-zÀ-ÿ\u0600-\u06FF\s'-]{3,60}" disabled={isSending} required />
              </ContactField>
              <ContactField icon={FiMail} label={copy.fields.email} error={errors.email} index={1}>
                <input className={inputClass} value={formData.email} onChange={(event) => updateField("email", event.target.value)} placeholder={copy.placeholders.email} type="email" autoComplete="email" disabled={isSending} required />
              </ContactField>
              <ContactField icon={FiPhone} label={copy.fields.phone} error={errors.phone} index={2}>
                <input className={inputClass} value={formData.phone} onChange={(event) => updateField("phone", event.target.value)} placeholder={copy.placeholders.phone} type="tel" autoComplete="tel" pattern="\+?[0-9\s]{8,15}" disabled={isSending} />
              </ContactField>
              <ContactField icon={FiList} label={copy.fields.type} error={errors.type} index={3}>
                <select className={inputClass} value={formData.type} onChange={(event) => updateField("type", event.target.value)} disabled={isSending} required>
                  <option value="">{copy.placeholders.type}</option>
                  {copy.requestTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </ContactField>
              <ContactField icon={FiFileText} label={copy.fields.subject} error={errors.subject} index={4}>
                <input className={inputClass} value={formData.subject} onChange={(event) => updateField("subject", event.target.value)} placeholder={copy.placeholders.subject} type="text" minLength={5} maxLength={100} disabled={isSending} required />
              </ContactField>
              <ContactField icon={FiCalendar} label={copy.fields.deadline} error={errors.deadline} index={5}>
                <input className={inputClass} value={formData.deadline} onChange={(event) => updateField("deadline", event.target.value)} placeholder={copy.placeholders.deadline} type="date" min={today} disabled={isSending} />
              </ContactField>
              <ContactField icon={FiDollarSign} label={copy.fields.budget} error={errors.budget} index={6}>
                <div className="relative">
                  <input className={`${inputClass} pe-16`} value={formData.budget} onChange={(event) => updateField("budget", event.target.value)} placeholder={copy.placeholders.budget} type="number" min="0" step="0.01" disabled={isSending} />
                  <span className="pointer-events-none absolute inset-y-0 end-4 flex items-center text-sm font-extrabold text-slate-500 dark:text-slate-300">TND</span>
                </div>
              </ContactField>
            </div>

            <div className="relative mt-5">
              <ContactField icon={FiMessageSquare} label={copy.fields.message} error={errors.message} index={7}>
                <textarea className={`${inputClass} min-h-36 resize-y leading-7`} value={formData.message} onChange={(event) => updateField("message", event.target.value)} placeholder={copy.placeholders.message} minLength={20} maxLength={messageMaxLength} disabled={isSending} required />
                <span className="mt-2 block text-end text-xs font-bold text-slate-500 dark:text-slate-400">
                  {formData.message.length}/{messageMaxLength}
                </span>
              </ContactField>
            </div>

            <motion.button
              type="submit"
              disabled={isSending}
              whileHover={!isSending ? { y: -2 } : undefined}
              whileTap={!isSending ? { scale: 0.98 } : undefined}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-600 px-6 py-4 font-extrabold text-white shadow-lg shadow-blue-500/25 transition hover:shadow-xl hover:shadow-violet-500/25 disabled:cursor-not-allowed disabled:opacity-65"
            >
              <FiSend aria-hidden="true" />
              {isSending ? copy.sending : copy.submit}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
