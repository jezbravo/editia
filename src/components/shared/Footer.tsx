import { getTranslations } from "next-intl/server";

async function Footer() {
  const t = await getTranslations("Footer");
  const currentYear = new Date().getFullYear();
  return (
    <footer className="fixed bottom-0 h-auto w-full bg-neutral-200 p-0 text-center text-white dark:bg-neutral-700 lg:text-left">
      <div className="p-1 text-center text-neutral-700 dark:text-neutral-200">
        © {currentYear} Editia Inc.
        <a href="mailto:info@jezbravo.com" className="text-blue-500">
          {" "}
          {t("contact")}.
        </a>
      </div>
    </footer>
  );
}

export default Footer;
