/*
 * DRAFT: needs Tony's or a lawyer's review before it is relied on.
 *
 * Written in plain language from what the site does today: the Formspree intake
 * form (/initialize), MailerLite email signups, Wise payment links, and the
 * Google Analytics and Metricool scripts in client/index.html. It makes no claim
 * about which privacy law applies.
 *
 * TODO(tony): confirm or fill in
 *   - how long intake answers and email-list details are kept;
 *   - the name of the coaching app provider behind EverCapable;
 *   - that you never see card numbers on Wise payments;
 *   - whether anyone else (an assistant, a VA) can read client information.
 */
import { EmailLink, LegalPage, LegalSection } from "@/components/LegalPage";

export default function Privacy() {
  return (
    <LegalPage
      path="/privacy"
      title="Privacy"
      description="What Tony Nguyen Fit collects about you, why I collect it, and the services that handle it along the way. Tony Nguyen Fit is me, Tony Nguyen, working as a sole trader in New Zealand."
    >
      <LegalSection title="The intake form">
        <p>
          After you book, the intake form asks for your name, email and time zone, along with details about your health and habits. That covers your age, weight and height, your training history, past diets, how you track food, dietary restrictions, goals, injuries, sleep and stress, anything a doctor is currently managing, and, if you choose to answer, any history of disordered eating.
        </p>
        <p>
          The form is sent through Formspree, a form service that passes your answers on to me. I use them to prepare for your session and to coach you.
        </p>
      </LegalSection>

      <LegalSection title="Emails">
        <p>
          If you sign up for the free 12-Week Energy Reset or another email list on this site, your name and email are stored with MailerLite, the service that sends those emails. You can unsubscribe at any time using the link in any email.
        </p>
      </LegalSection>

      <LegalSection title="Payments">
        <p>
          Payments go through Wise. Wise handles your payment details under its own privacy policy, and I don't see or store your card number.
        </p>
      </LegalSection>

      <LegalSection title="Visiting the site">
        <p>
          The site uses Google Analytics and Metricool to count visits and see which pages people read. These tools can set cookies or similar identifiers in your browser.
        </p>
      </LegalSection>

      <LegalSection title="Coaching">
        <p>
          If you join Habits or 1:1, you log food and send check-ins through the coaching app, which runs under the EverCapable name. What you share there is used for your coaching.
        </p>
      </LegalSection>

      <LegalSection title="What I don't do">
        <p>I don't sell your information, and I don't use your health details for anything other than coaching you.</p>
      </LegalSection>

      <LegalSection title="Seeing or changing your information">
        <p>
          You can ask to see what I hold about you, and you can ask me to correct or delete it. Email <EmailLink /> and I'll sort it out.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
