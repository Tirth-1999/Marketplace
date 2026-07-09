import Link from "next/link";
import { ArrowLeft, Clock, Phone, User } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CONTACT, whatsappUrl } from "@/lib/contact";

export const metadata = {
  title: "Contact Me",
  description: `Contact ${CONTACT.name} on WhatsApp about marketplace items.`,
};

export default function ContactPage() {
  const message = `Hi ${CONTACT.name}, I saw your marketplace and want to ask about an item.`;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-xl flex-1 px-3 py-6 sm:px-4 sm:py-8 lg:py-10">
        <Button
          variant="ghost"
          className="mb-4 h-11 min-h-11 -ml-2 px-3 text-sm sm:mb-5 sm:text-base"
          render={<Link href="/" />}
          nativeButton={false}
        >
          <ArrowLeft className="size-5" />
          Back to items
        </Button>

        <Card>
          <CardHeader className="space-y-2">
            <CardTitle className="text-xl sm:text-2xl lg:text-3xl">
              Contact Me
            </CardTitle>
            <CardDescription className="text-sm sm:text-base lg:text-lg">
              Message or call directly — no form to fill out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 sm:space-y-6">
            <div className="flex items-start gap-3 text-sm sm:text-base lg:text-lg">
              <User className="mt-1 size-5 shrink-0 text-muted-foreground" />
              <div>
                <p className="font-semibold">Name</p>
                <p className="text-muted-foreground">{CONTACT.name}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm sm:text-base lg:text-lg">
              <Phone className="mt-1 size-5 shrink-0 text-muted-foreground" />
              <div>
                <p className="font-semibold">WhatsApp / Phone</p>
                <p className="text-muted-foreground">{CONTACT.phoneDisplay}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm sm:text-base lg:text-lg">
              <Clock className="mt-1 size-5 shrink-0 text-muted-foreground" />
              <div>
                <p className="font-semibold">Best time to reach me</p>
                <p className="text-muted-foreground">
                  DM or call between {CONTACT.hours}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Button
                className="h-11 min-h-11 flex-1 bg-[#25D366] text-base text-white hover:bg-[#1ebe57] hover:text-white"
                render={
                  <a
                    href={whatsappUrl(message)}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                nativeButton={false}
              >
                <WhatsAppIcon className="size-5" />
                Open WhatsApp
              </Button>
              <Button
                variant="outline"
                className="h-11 min-h-11 flex-1 text-base"
                render={<a href={`tel:+${CONTACT.phoneE164}`} />}
                nativeButton={false}
              >
                <Phone className="size-5" />
                Call now
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
