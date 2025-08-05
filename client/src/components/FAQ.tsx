import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Trans, useTranslation } from "react-i18next";
import CTA from "@/components/CTA";
import { useLocation } from "wouter";

type FAQItem = {
  question: string;
  answerKey: string;
};

const FAQ: React.FC = () => {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();

  const faqItems: FAQItem[] = Array.from({ length: 12 }, (_, i) => ({
    question: t(`faq.questions.q${i + 1}`),
    answerKey: `faq.answers.a${i + 1}`, // <- tylko klucz tłumaczenia
  }));

  const handleContactClick = () => {
    setLocation("/contact");
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <>
      <motion.div
        className="text-center mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-3xl md:text-4xl font-display font-semibold text-secondary mb-4">
          {t("faq.title")}
        </h2>
        <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
        <p className="max-w-2xl mx-auto text-foreground/70">
          {t("faq.subtitle")}
        </p>
      </motion.div>

      <motion.div
        className="max-w-3xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={`faq-${index}`} value={`faq-${index}`}>
              <AccordionTrigger className="text-left text-base md:text-lg font-medium py-4 hover:text-primary transition-colors">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-foreground/70 text-base">
                <Trans
                  i18nKey={item.answerKey}
                  components={{ strong: <strong /> }}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>

      <motion.div
        className="mt-16 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h3 className="text-xl font-medium mb-6">{t("faq.cta")}</h3>
        <CTA
          primary={{
            text: t("faq.ctaButton"),
            action: handleContactClick,
          }}
          className="justify-center"
        />
      </motion.div>
    </>
  );
};

export default FAQ;
