"use client"

import { useMemo, useState } from "react"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const CONTACT_FIELDS = [
  { id: "first-name", name: "firstName" as const, label: "First Name", half: true, placeholder: "Jane" },
  { id: "last-name", name: "lastName" as const, label: "Last Name", half: true, placeholder: "Doe" },
  { id: "email", name: "email" as const, label: "Email", half: true, placeholder: "you@example.com" },
  { id: "phone", name: "phone" as const, label: "Phone", half: true, placeholder: "(555) 555-5555" },
  {
    id: "company-name",
    name: "companyName" as const,
    label: "Company Name",
    half: false,
    placeholder: "Company name",
  },
  {
    id: "message",
    name: "message" as const,
    label: "Message",
    half: false,
    multiline: true,
    placeholder: "How can we help?",
  },
] as const

type ContactFieldName = (typeof CONTACT_FIELDS)[number]["name"]

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  phone: z.string().min(1, "Phone is required"),
  companyName: z.string().min(1, "Company name is required"),
  message: z.string().min(1, "Message is required"),
})

type ContactValues = z.infer<typeof contactSchema>

const EMPTY_VALUES: ContactValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  companyName: "",
  message: "",
}

/** Property detail contact section — required-field validation with per-field error hints. */
export function ContactForm() {
  const [values, setValues] = useState<ContactValues>(EMPTY_VALUES)
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [touched, setTouched] = useState<Partial<Record<ContactFieldName, boolean>>>({})

  const errors = useMemo(() => {
    const result = contactSchema.safeParse(values)
    if (result.success) return {} as Partial<Record<ContactFieldName, string>>
    const next: Partial<Record<ContactFieldName, string>> = {}
    for (const issue of result.error.issues) {
      const key = issue.path[0] as ContactFieldName | undefined
      if (key && !next[key]) next[key] = issue.message
    }
    return next
  }, [values])

  const visibleErrors = useMemo(() => {
    const next: Partial<Record<ContactFieldName, string>> = {}
    ;(Object.keys(errors) as ContactFieldName[]).forEach((key) => {
      if (!errors[key]) return
      if (submitAttempted || touched[key]) next[key] = errors[key]
    })
    return next
  }, [errors, submitAttempted, touched])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitAttempted(true)
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      companyName: true,
      message: true,
    })
    if (contactSchema.safeParse(values).success) {
      // No backend yet — validation-only submit guard
    }
  }

  return (
    <form
      className="flex flex-col gap-[var(--space-3xl)]"
      onSubmit={handleSubmit}
      noValidate
    >
      <h2 className="text-display-md text-[var(--color-content)]">Find the perfect space.</h2>

      <div className="flex w-full flex-wrap gap-[var(--space-2xl)]">
        {CONTACT_FIELDS.map((field) => {
          const error = visibleErrors[field.name]
          const hasError = !!error

          return (
            <Field
              key={field.id}
              data-invalid={hasError || undefined}
              className={
                field.half
                  ? "min-w-[var(--layout-form-col-min)] max-w-full flex-[1_1_calc(50%-var(--space-2xl)/2)]"
                  : "w-full min-w-0 basis-full"
              }
            >
              <FieldLabel htmlFor={field.id}>{field.label}</FieldLabel>
              <FieldContent>
                {"multiline" in field && field.multiline ? (
                  <Textarea
                    id={field.id}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={values[field.name]}
                    variant={hasError ? "invalid" : "default"}
                    size="lg"
                    required
                    aria-invalid={hasError}
                    aria-describedby={hasError ? `${field.id}-error` : undefined}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, [field.name]: e.target.value }))
                    }
                    onBlur={() => setTouched((t) => ({ ...t, [field.name]: true }))}
                  />
                ) : (
                  <Input
                    id={field.id}
                    name={field.name}
                    type={field.name === "email" ? "email" : field.name === "phone" ? "tel" : "text"}
                    placeholder={field.placeholder}
                    value={values[field.name]}
                    variant={hasError ? "invalid" : "default"}
                    size="lg"
                    required
                    aria-invalid={hasError}
                    aria-describedby={hasError ? `${field.id}-error` : undefined}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, [field.name]: e.target.value }))
                    }
                    onBlur={() => setTouched((t) => ({ ...t, [field.name]: true }))}
                  />
                )}
                {hasError && (
                  <FieldError id={`${field.id}-error`}>{error}</FieldError>
                )}
              </FieldContent>
            </Field>
          )
        })}
      </div>

      <Button type="submit" variant="default" size="lg" className="w-fit">
        Send Message
      </Button>
    </form>
  )
}
