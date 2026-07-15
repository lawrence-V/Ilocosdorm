import Link from "next/link";
import {
  ArrowRightIcon,
  BadgeCheckIcon,
  BanknoteIcon,
  CircleAlertIcon,
  ClipboardCheckIcon,
  EyeIcon,
  FileTextIcon,
  LockKeyholeIcon,
  MapPinCheckIcon,
  ShieldCheckIcon,
  UserRoundCheckIcon,
} from "lucide-react";

import { PageContainer } from "@/components/common/PageContainer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const SAFETY_STEPS = [
  {
    icon: BadgeCheckIcon,
    title: "Check the listing and contact",
    description:
      "Use the verified badge as one signal, then confirm the contact person's identity and authority to rent the property.",
  },
  {
    icon: EyeIcon,
    title: "View before you pay",
    description:
      "Visit the dorm in person. If that is impossible, arrange a live video tour with someone you trust before paying anything.",
  },
  {
    icon: MapPinCheckIcon,
    title: "Confirm the real location",
    description:
      "Compare the written address, map pin, photos, signage, and nearby landmarks. Search for copied listings with different contacts.",
  },
  {
    icon: FileTextIcon,
    title: "Read the agreement",
    description:
      "Get the rent, deposit, refund rules, utilities, house rules, and move-in date in writing before committing.",
  },
  {
    icon: BanknoteIcon,
    title: "Pay traceably",
    description:
      "Pay only after verification, use an account belonging to the owner or authorized manager, and always request a receipt.",
  },
  {
    icon: LockKeyholeIcon,
    title: "Protect personal information",
    description:
      "Do not send IDs, financial details, passwords, or one-time codes unless the information is necessary and the recipient is verified.",
  },
];

const RED_FLAGS = [
  "You are pressured to pay immediately to hold the room.",
  "The owner refuses an in-person or live video viewing.",
  "The price is far below similar dorms without a clear reason.",
  "The payment name does not match the owner or authorized manager.",
  "The same photos or address appear online with different contact details.",
  "You are asked for gift cards, cryptocurrency, passwords, or one-time codes.",
];

export function SafetyGuidelinesFeature() {
  return (
    <PageContainer className="py-10 md:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-3xl">
          <Badge variant="secondary">
            <ShieldCheckIcon data-icon="inline-start" />
            Safety first
          </Badge>
          <h1 className="mt-5 text-balance text-4xl leading-tight font-semibold tracking-[-0.04em] sm:text-5xl md:text-6xl">
            Find a dorm without rushing into a risky payment
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            Verification helps reduce risk, but no badge replaces your own checks. Use these steps
            before sharing sensitive information, signing an agreement, or sending money.
          </p>
        </div>

        <Card className="mt-10 border-primary/25 bg-primary/5 shadow-none">
          <CardContent className="flex gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <CircleAlertIcon className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-semibold">
                IlocosDorm does not collect reservation fees, deposits, or rent.
              </p>
              <p className="mt-1 leading-6 text-muted-foreground">
                A request to pay is an arrangement between you and the property contact. Confirm the
                property, identity, agreement, and payment recipient first.
              </p>
            </div>
          </CardContent>
        </Card>

        <section className="mt-14">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-[-0.03em]">
              Six checks before committing
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              Complete every check even when a listing or owner appears trustworthy.
            </p>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SAFETY_STEPS.map(({ icon: Icon, title, description }) => (
              <Card key={title} className="rounded-2xl shadow-none">
                <CardHeader>
                  <span className="mb-3 flex size-10 items-center justify-center rounded-xl bg-secondary text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <CardTitle className="text-lg font-semibold">{title}</CardTitle>
                  <CardDescription className="leading-6">{description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="rounded-2xl border-destructive/25 bg-destructive/5 shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                <CircleAlertIcon className="size-5 text-destructive" aria-hidden="true" />
                Stop when you notice these red flags
              </CardTitle>
              <CardDescription>Do not let urgency replace verification.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-3">
                {RED_FLAGS.map((warning) => (
                  <li key={warning} className="flex items-start gap-3 leading-6">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-destructive" />
                    {warning}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                <UserRoundCheckIcon className="size-5 text-primary" aria-hidden="true" />
                Arrange a safer viewing
              </CardTitle>
              <CardDescription>Plan the visit before meeting a stranger.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {[
                "Meet during daylight when possible.",
                "Bring a family member or trusted friend.",
                "Share the address and viewing time with someone.",
                "Check that the property and contact match the listing.",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <ClipboardCheckIcon
                    className="mt-0.5 size-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <p className="leading-6">{item}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <Separator className="my-14" />

        <section className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.025em]">
              Research and report concerns
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
              Search the property address and contact name, keep screenshots of suspicious
              conversations, and report fraudulent activity to the platform and appropriate local
              authorities.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
              <Link
                href="https://consumer.ftc.gov/articles/rental-listing-scams"
                className="text-primary hover:underline"
              >
                Rental scam guidance
              </Link>
              <Link
                href="https://privacy.gov.ph/data-subject-rights/"
                className="text-primary hover:underline"
              >
                Philippine privacy rights
              </Link>
            </div>
          </div>
          <Button render={<Link href="/dorms" />} size="lg" className="h-11 w-fit">
            Browse verified dorms
            <ArrowRightIcon data-icon="inline-end" />
          </Button>
        </section>
      </div>
    </PageContainer>
  );
}
