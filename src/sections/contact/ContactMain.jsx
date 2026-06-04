import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import styles from './ContactMain.module.css'

// ── EMAILJS CONFIG (set in .env) ───────────────────────────
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

// ── CONTACT INFO ───────────────────────────────────────────
const contactInfo = [
  {
    icon: <PhoneIcon />,
    label: 'Phone',
    value: '+250 788 470 243',
    href: 'tel:+250788470243',
  },
  {
    icon: <EmailIcon />,
    label: 'Email',
    value: 'sagecltd@gmail.com',
    href: 'mailto:sagecltd@gmail.com',
  },
  {
    icon: <LocationIcon />,
    label: 'Address',
    value: 'Kigali, Rwanda',
    href: null,
  },
  {
    icon: <ClockIcon />,
    label: 'Office Hours',
    value: 'Mon – Fri, 8:00 AM – 6:00 PM',
    href: null,
  },
]

// ── ICONS ──────────────────────────────────────────────────

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.5 11.5 0 003.59.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.24 1.02L6.62 10.79z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M2 7l10 7 10-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.112 1.523 5.84L.057 23.249l5.565-1.452A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.877 9.877 0 01-5.032-1.378l-.361-.214-3.733.974 1.003-3.63-.235-.374A9.859 9.859 0 012.106 12C2.106 6.58 6.58 2.106 12 2.106S21.894 6.58 21.894 12 17.42 21.894 12 21.894z"/>
    </svg>
  )
}

// ── FIELD ANIMATION ────────────────────────────────────────
const fieldVariants = {
  hidden:  { opacity: 0, height: 0, marginBottom: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    marginBottom: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    height: 0,
    marginBottom: 0,
    transition: { duration: 0.25, ease: 'easeIn' },
  },
}

// ── MAIN COMPONENT ─────────────────────────────────────────

export default function ContactMain() {
  const formRef = useRef(null)

  const [category, setCategory]   = useState('personal')
  const [status, setStatus]       = useState('idle') // idle | sending | success | error
  const [errors, setErrors]       = useState({})

  // Basic validation
  const validate = (form) => {
    const errs = {}
    if (!form.first_name?.trim())  errs.first_name  = 'First name is required'
    if (!form.last_name?.trim())   errs.last_name   = 'Last name is required'
    if (!form.email?.trim())       errs.email       = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email'
    if (!form.phone?.trim())       errs.phone       = 'Phone number is required'
    if (category === 'company' && !form.organisation?.trim())
      errs.organisation = 'Organisation is required for company enquiries'
    if (!form.subject?.trim())     errs.subject     = 'Subject is required'
    if (!form.message?.trim())     errs.message     = 'Message is required'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = Object.fromEntries(new FormData(formRef.current))
    const errs = validate(formData)

    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setErrors({})
    setStatus('sending')

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: EMAILJS_PUBLIC_KEY }
      )
      setStatus('success')
      formRef.current.reset()
      setCategory('personal')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* ── FORM SIDE (white) ──────────────── */}
        <motion.div
          className={styles.formSide}
          initial={{ opacity: 0, x: -48 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.formHeader}>
            <p className={styles.formEyebrow}>Send us a message</p>
            <h2 className={styles.formHeading}>How can we help?</h2>
          </div>

          {/* Category toggle */}
          <div className={styles.toggle} role="group" aria-label="Enquiry type">
            <button
              type="button"
              className={`${styles.toggleBtn} ${category === 'personal' ? styles.toggleActive : ''}`}
              onClick={() => setCategory('personal')}
            >
              Personal
            </button>
            <button
              type="button"
              className={`${styles.toggleBtn} ${category === 'company' ? styles.toggleActive : ''}`}
              onClick={() => setCategory('company')}
            >
              Company
            </button>
          </div>

          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} noValidate className={styles.form}>

            {/* Hidden field for category */}
            <input type="hidden" name="category" value={category} />

            {/* Name row */}
            <div className={styles.fieldRow}>
              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="first_name">First Name</label>
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  className={`${styles.input} ${errors.first_name ? styles.inputError : ''}`}
                  placeholder="John"
                  autoComplete="given-name"
                />
                {errors.first_name && <p className={styles.error}>{errors.first_name}</p>}
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="last_name">Last Name</label>
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  className={`${styles.input} ${errors.last_name ? styles.inputError : ''}`}
                  placeholder="Doe"
                  autoComplete="family-name"
                />
                {errors.last_name && <p className={styles.error}>{errors.last_name}</p>}
              </div>
            </div>

            {/* Email */}
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                placeholder="john@example.com"
                autoComplete="email"
              />
              {errors.email && <p className={styles.error}>{errors.email}</p>}
            </div>

            {/* Phone */}
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                placeholder="+250 7XX XXX XXX"
                autoComplete="tel"
              />
              {errors.phone && <p className={styles.error}>{errors.phone}</p>}
            </div>

            {/* Organisation — only for Company */}
            <AnimatePresence>
              {category === 'company' && (
                <motion.div
                  className={styles.fieldGroup}
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  style={{ overflow: 'hidden' }}
                >
                  <label className={styles.label} htmlFor="organisation">Organisation</label>
                  <input
                    id="organisation"
                    name="organisation"
                    type="text"
                    className={`${styles.input} ${errors.organisation ? styles.inputError : ''}`}
                    placeholder="Company name"
                    autoComplete="organization"
                  />
                  {errors.organisation && <p className={styles.error}>{errors.organisation}</p>}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Subject */}
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="subject">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                className={`${styles.input} ${errors.subject ? styles.inputError : ''}`}
                placeholder="Tell us briefly what this is about"
              />
              {errors.subject && <p className={styles.error}>{errors.subject}</p>}
            </div>

            {/* Message */}
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                placeholder="Describe your project or enquiry in detail..."
              />
              {errors.message && <p className={styles.error}>{errors.message}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={status === 'sending'}
            >
              {status === 'sending' ? (
                <span className={styles.spinner} aria-label="Sending..." />
              ) : (
                <>
                  <SendIcon />
                  Send Message
                </>
              )}
            </button>

            {/* Success / Error messages */}
            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  key="success"
                  className={styles.successMsg}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  ✓ Message sent! We'll get back to you within 24 hours.
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  key="error"
                  className={styles.errorMsg}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  Something went wrong. Please try again or email us directly.
                </motion.div>
              )}
            </AnimatePresence>

          </form>
        </motion.div>

        {/* ── INFO SIDE (dark navy) ──────────── */}
        <motion.div
          className={styles.infoSide}
          initial={{ opacity: 0, x: 48 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          {/* Decorative construction geometric shapes */}
          <div className={styles.deco1} aria-hidden="true" />
          <div className={styles.deco2} aria-hidden="true" />
          <div className={styles.deco3} aria-hidden="true" />

          <div className={styles.infoContent}>
            <p className={styles.infoEyebrow}>Contact Details</p>
            <h3 className={styles.infoHeading}>We're Here For You</h3>
            <div className={styles.infoAccent} aria-hidden="true" />

            {/* Contact items */}
            <ul className={styles.infoList}>
              {contactInfo.map((item) => (
                <li key={item.label} className={styles.infoItem}>
                  <div className={styles.infoIcon}>{item.icon}</div>
                  <div className={styles.infoText}>
                    <span className={styles.infoLabel}>{item.label}</span>
                    {item.href ? (
                      <a href={item.href} className={styles.infoValue}>
                        {item.value}
                      </a>
                    ) : (
                      <span className={styles.infoValue}>{item.value}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/250788470243"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappBtn}
            >
              <WhatsAppIcon />
              Chat on WhatsApp
            </a>

            {/* Response time note */}
            <p className={styles.responseNote}>
              Prefer a quick reply? WhatsApp is the fastest way
              to reach our team.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}