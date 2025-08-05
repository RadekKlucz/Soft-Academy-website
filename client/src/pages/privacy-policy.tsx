import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function PrivacyPolicy() {
  const { t } = useTranslation();

  return (
    <div className="container max-w-4xl py-12 px-4 pt-32">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
          {t("footer.privacy")}
        </h1>
        <p className="text-muted-foreground mb-8">
          {t("privacyPolicy.lastUpdated")}: {t("privacyPolicy.date")}
        </p>
      </div>

      <div className="prose prose-stone dark:prose-invert max-w-none">
        {Array.from({ length: 13 }).map((_, i) => {
          const sectionKey = `privacyPolicy.sections.section${i + 1}`;
          const title = t(`${sectionKey}.title`);

          // Content1, content2, content3... jeśli istnieją
          const contentList: JSX.Element[] = [];
          let contentIndex = 1;
          while (true) {
            const key = `${sectionKey}.content${contentIndex}`;
            const value = t(key);
            if (value === key) break;
            contentList.push(<p key={key}>{value}</p>);
            contentIndex++;
          }

          // Lista zagnieżdżona (items / item1..n)
          const items: JSX.Element[] = [];

          // obsługa np. items.item1...itemN
          for (let j = 1; j <= 20; j++) {
            const itemKey = `${sectionKey}.items.item${j}`;
            const val = t(itemKey);
            if (val !== itemKey) {
              items.push(<li key={itemKey}>{val}</li>);
            }
          }

          // alternatywnie obsługa item1, item2 bez .items
          for (let j = 1; j <= 10; j++) {
            const itemKey = `${sectionKey}.item${j}`;
            const val = t(itemKey);
            if (val !== itemKey) {
              items.push(<li key={itemKey}>{val}</li>);
            }
          }

          return (
            <div key={sectionKey}>
              <h2>{title}</h2>
              {contentList}
              {items.length > 0 && <ul>{items}</ul>}
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-left">
        <Link href="/">
          <Button
            variant="default"
            className="bg-primary text-white hover:bg-primary/80 rounded-md px-6 py-2"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            {t("footer.backToHome")}
          </Button>
        </Link>
      </div>
    </div>
  );
}
