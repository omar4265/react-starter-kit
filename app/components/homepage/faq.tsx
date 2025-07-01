import { useState } from "react";

const faqs = [
  {
    question: "How does CVReach work?",
    answer:
      "Upload your CV, tell us your preferences, and our team of real hiring professionals will review, optimize, and distribute your CV to hundreds of relevant companies."
  },
  {
    question: "Who reviews my CV?",
    answer:
      "Every CV is reviewed and enhanced by experienced recruiters and industry professionals—not AI or bots."
  },
  {
    question: "How many companies will receive my CV?",
    answer:
      "Depending on your plan, your CV will be sent to 100, 300, or 500 top-matching companies from our database of 200M+."
  },
  {
    question: "Is my data safe?",
    answer:
      "Absolutely. Your CV and personal information are encrypted and never shared with third parties outside your chosen distribution." 
  },
  {
    question: "How soon will I get results?",
    answer:
      "Most users start hearing back from companies within a few days to a couple of weeks after distribution."
  },
  {
    question: "Can I choose which companies get my CV?",
    answer:
      "Yes! You can specify your target industries, roles, locations, and preferences. Our team will match you with the best-fit companies."
  },
  {
    question: "What if I need help or have questions?",
    answer:
      "Our support team is here for you. Just reach out via our contact form or help center."
  }
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="py-24 bg-background">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border rounded-xl bg-muted/30">
              <button
                className="w-full flex justify-between items-center px-6 py-5 text-left text-lg font-medium focus:outline-none"
                onClick={() => setOpen(open === idx ? null : idx)}
                aria-expanded={open === idx}
              >
                <span>{faq.question}</span>
                <span className={`ml-4 transition-transform ${open === idx ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {open === idx && (
                <div className="px-6 pb-5 text-muted-foreground text-base animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 