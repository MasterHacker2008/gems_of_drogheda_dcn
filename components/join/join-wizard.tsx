"use client";

import { Check } from "lucide-react";
import { useState, useTransition, type ReactNode } from "react";

import { submitJoinForm } from "@/app/join/actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { GemIcon } from "@/components/ui/gem-icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PillButton } from "@/components/ui/pill-button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  countryCodes,
  initialJoinValues,
  involvementOptions,
  needsProductCategory,
  stepFields,
  stepIsValid,
  validateJoin,
  type JoinFormValues,
} from "@/lib/join-form";
import { cn } from "@/lib/utils";

const steps = ["Business details", "Participation", "Contact info", "Preferences & review"];

type FieldProps = {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
};

function Field({ id, label, optional, error, hint, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>
        {label}
        {optional ? <span className="ml-1.5 text-xs font-medium text-muted-foreground">(optional)</span> : null}
      </Label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm font-medium text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p className="text-sm text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-border py-3 last:border-b-0 sm:flex-row sm:gap-6">
      <dt className="w-44 shrink-0 text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground">{label}</dt>
      <dd className="break-words text-[15px] font-medium text-foreground">{value || "—"}</dd>
    </div>
  );
}

export function JoinWizard() {
  const [values, setValues] = useState<JoinFormValues>(initialJoinValues);
  const [step, setStep] = useState(0);
  const [touched, setTouched] = useState<Partial<Record<keyof JoinFormValues, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const allErrors = validateJoin(values);
  const shown = (field: keyof JoinFormValues) => (touched[field] ? allErrors[field] : undefined);
  const touch = (field: keyof JoinFormValues) => setTouched((t) => ({ ...t, [field]: true }));
  const set = <K extends keyof JoinFormValues>(field: K, value: JoinFormValues[K]) =>
    setValues((v) => ({ ...v, [field]: value }));

  const lastStep = steps.length - 1;
  const valid = stepIsValid(step, values);
  // A step is reachable if every step before it is valid.
  const canReach = (target: number) => steps.slice(0, target).every((_, i) => stepIsValid(i, values));

  function goTo(target: number) {
    stepFields[step].forEach(touch);
    if (target <= step || canReach(target)) setStep(target);
  }

  function submit() {
    setServerError(null);
    startTransition(async () => {
      const result = await submitJoinForm(values);
      if (result.ok) setSubmitted(true);
      else setServerError(result.message);
    });
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-5 rounded-[2rem] bg-secondary p-8 text-secondary-foreground md:p-12">
        <GemIcon size={22} fillClassName="text-secondary-foreground" />
        <h2 className="font-heading text-3xl font-semibold tracking-tight">
          Thanks, {values.fullName.trim().split(" ")[0]}!
        </h2>
        <p className="max-w-[32em] text-lg leading-relaxed text-secondary-foreground/80">
          We&rsquo;ve got the details for {values.businessName}. We&rsquo;ll be in touch at {values.email} soon.
        </p>
        <PillButton href="/" variant="dark" size="md">
          Back to home
        </PillButton>
      </div>
    );
  }

  const involvementLabels = values.involvement.map(
    (v) => involvementOptions.find((o) => o.value === v)?.label ?? v,
  );

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (step === lastStep && valid) submit();
      }}
      className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-card"
    >
      <nav aria-label="Progress" className="border-b border-border bg-background px-5 py-5 md:px-10">
        <ol className="flex items-start gap-2">
          {steps.map((label, i) => {
            const done = i < step && stepIsValid(i, values);
            const current = i === step;
            const reachable = i <= step || canReach(i);
            return (
              <li key={label} className="flex flex-1 flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  disabled={!reachable}
                  aria-current={current ? "step" : undefined}
                  className="group flex flex-col items-start gap-2 text-left focus-visible:outline-none disabled:cursor-not-allowed"
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border-[1.5px] font-heading text-sm font-bold transition-colors group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2",
                      current && "border-primary bg-primary text-primary-foreground",
                      done && "border-secondary bg-secondary text-secondary-foreground",
                      !current && !done && "border-foreground/30 text-muted-foreground",
                    )}
                  >
                    {done ? <Check className="h-4 w-4" strokeWidth={3} /> : i + 1}
                  </span>
                  <span
                    className={cn(
                      "hidden font-heading text-[13px] font-bold leading-tight sm:block",
                      current ? "text-foreground" : "text-muted-foreground",
                      reachable && !current && "group-hover:text-primary",
                    )}
                  >
                    {label}
                  </span>
                </button>
                <span
                  aria-hidden
                  className={cn("h-1 rounded-full transition-colors", i <= step ? "bg-primary" : "bg-border")}
                />
              </li>
            );
          })}
        </ol>
        <p className="mt-3 font-heading text-sm font-bold sm:hidden">
          Step {step + 1} of {steps.length}: {steps[step]}
        </p>
      </nav>

      <div className="flex flex-col gap-6 px-5 py-8 md:px-10 md:py-10">
        {step === 0 ? (
          <>
            <Field id="businessName" label="Business name" error={shown("businessName")}>
              <Input
                id="businessName"
                name="businessName"
                autoComplete="organization"
                value={values.businessName}
                onChange={(e) => set("businessName", e.target.value)}
                onBlur={() => touch("businessName")}
                aria-invalid={!!shown("businessName")}
                aria-describedby={shown("businessName") ? "businessName-error" : undefined}
              />
            </Field>
            <Field id="fullName" label="Your full name" error={shown("fullName")}>
              <Input
                id="fullName"
                name="fullName"
                autoComplete="name"
                value={values.fullName}
                onChange={(e) => set("fullName", e.target.value)}
                onBlur={() => touch("fullName")}
                aria-invalid={!!shown("fullName")}
                aria-describedby={shown("fullName") ? "fullName-error" : undefined}
              />
            </Field>
          </>
        ) : null}

        {step === 1 ? (
          <>
            <fieldset className="flex flex-col gap-3">
              <legend className="mb-1 font-heading text-sm font-bold">How would you like to get involved?</legend>
              <p className="-mt-1 text-sm text-muted-foreground">Choose as many as you like.</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {involvementOptions.map((option) => {
                  const checked = values.involvement.includes(option.value);
                  return (
                    <label
                      key={option.value}
                      htmlFor={`involvement-${option.value}`}
                      className={cn(
                        "flex cursor-pointer items-start gap-3 rounded-2xl border-[1.5px] p-4 transition-colors",
                        checked ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/60",
                      )}
                    >
                      <Checkbox
                        id={`involvement-${option.value}`}
                        checked={checked}
                        onCheckedChange={(next) => {
                          touch("involvement");
                          set(
                            "involvement",
                            next === true
                              ? [...values.involvement, option.value]
                              : values.involvement.filter((v) => v !== option.value),
                          );
                        }}
                        className="mt-0.5"
                      />
                      <span className="flex flex-col gap-0.5">
                        <span className="font-heading text-[15px] font-bold">{option.label}</span>
                        <span className="text-sm leading-snug text-muted-foreground">{option.hint}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
              {shown("involvement") ? (
                <p role="alert" className="text-sm font-medium text-destructive">
                  {shown("involvement")}
                </p>
              ) : null}
            </fieldset>

            {needsProductCategory(values.involvement) ? (
              <Field
                id="productCategory"
                label="Category of products"
                error={shown("productCategory")}
                hint="e.g. jewellery, baked goods, ceramics, clothing"
              >
                <Input
                  id="productCategory"
                  name="productCategory"
                  value={values.productCategory}
                  onChange={(e) => set("productCategory", e.target.value)}
                  onBlur={() => touch("productCategory")}
                  aria-invalid={!!shown("productCategory")}
                  aria-describedby={shown("productCategory") ? "productCategory-error" : undefined}
                />
              </Field>
            ) : null}
          </>
        ) : null}

        {step === 2 ? (
          <>
            <Field id="email" label="Email" error={shown("email")}>
              <Input
                id="email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="name@example.ie"
                value={values.email}
                onChange={(e) => set("email", e.target.value)}
                onBlur={() => touch("email")}
                aria-invalid={!!shown("email")}
                aria-describedby={shown("email") ? "email-error" : undefined}
              />
            </Field>

            <Field id="mobile" label="Mobile number" error={shown("mobile")}>
              <div className="flex gap-3">
                <Select value={values.countryCode} onValueChange={(v) => set("countryCode", v)}>
                  <SelectTrigger aria-label="Country code" className="w-32 shrink-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {countryCodes.map((c) => (
                      <SelectItem key={c.code} value={c.code}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel-national"
                  placeholder="85 123 4567"
                  value={values.mobile}
                  onChange={(e) => set("mobile", e.target.value)}
                  onBlur={() => touch("mobile")}
                  aria-invalid={!!shown("mobile")}
                  aria-describedby={shown("mobile") ? "mobile-error" : undefined}
                />
              </div>
            </Field>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field id="instagram" label="Instagram" optional error={shown("instagram")}>
                <Input
                  id="instagram"
                  name="instagram"
                  placeholder="@yourbusiness"
                  value={values.instagram}
                  onChange={(e) => set("instagram", e.target.value)}
                  onBlur={() => touch("instagram")}
                  aria-invalid={!!shown("instagram")}
                  aria-describedby={shown("instagram") ? "instagram-error" : undefined}
                />
              </Field>
              <Field id="website" label="Website" optional error={shown("website")}>
                <Input
                  id="website"
                  name="website"
                  inputMode="url"
                  placeholder="yourbusiness.ie"
                  value={values.website}
                  onChange={(e) => set("website", e.target.value)}
                  onBlur={() => touch("website")}
                  aria-invalid={!!shown("website")}
                  aria-describedby={shown("website") ? "website-error" : undefined}
                />
              </Field>
            </div>
          </>
        ) : null}

        {step === lastStep ? (
          <>
            <fieldset className="flex flex-col gap-3">
              <legend className="mb-1 font-heading text-sm font-bold">
                Would you like to be listed in the member directory?
              </legend>
              <RadioGroup
                value={values.inDirectory}
                onValueChange={(v) => set("inDirectory", v as JoinFormValues["inDirectory"])}
                className="grid-cols-2"
              >
                {(
                  [
                    ["yes", "Yes, list me"],
                    ["no", "No, not right now"],
                  ] as const
                ).map(([value, label]) => (
                  <label
                    key={value}
                    htmlFor={`directory-${value}`}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-2xl border-[1.5px] p-4 transition-colors",
                      values.inDirectory === value
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover:border-primary/60",
                    )}
                  >
                    <RadioGroupItem id={`directory-${value}`} value={value} />
                    <span className="font-heading text-[15px] font-bold">{label}</span>
                  </label>
                ))}
              </RadioGroup>
            </fieldset>

            <div className="flex flex-col gap-1 rounded-2xl bg-muted p-5 md:p-6">
              <h2 className="font-heading text-lg font-semibold">Review your details</h2>
              <dl className="mt-2 flex flex-col">
                <SummaryRow label="Business name" value={values.businessName} />
                <SummaryRow label="Full name" value={values.fullName} />
                <SummaryRow label="Getting involved" value={involvementLabels.join(", ")} />
                {needsProductCategory(values.involvement) ? (
                  <SummaryRow label="Product category" value={values.productCategory} />
                ) : null}
                <SummaryRow label="Email" value={values.email} />
                <SummaryRow label="Mobile" value={`${values.countryCode} ${values.mobile}`} />
                <SummaryRow label="Instagram" value={values.instagram} />
                <SummaryRow label="Website" value={values.website} />
                <SummaryRow label="In member directory" value={values.inDirectory === "yes" ? "Yes" : "No"} />
              </dl>
              <p className="mt-2 text-sm text-muted-foreground">
                Something not right? Click a step above to edit it. Your answers are kept.
              </p>
            </div>

            {serverError ? (
              <p role="alert" className="text-sm font-medium text-destructive">
                {serverError}
              </p>
            ) : null}
          </>
        ) : null}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border bg-background px-5 py-4 md:px-10">
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={() => setStep((s) => s - 1)}
          className={cn(step === 0 && "invisible")}
        >
          Back
        </Button>
        {step === lastStep ? (
          <Button type="submit" variant="primary" size="md" disabled={!valid || pending}>
            {pending ? "Submitting…" : "Submit"}
          </Button>
        ) : (
          <Button type="button" variant="primary" size="md" disabled={!valid} onClick={() => setStep((s) => s + 1)}>
            Next
          </Button>
        )}
      </div>
    </form>
  );
}
