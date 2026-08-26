import { redirect } from "next/navigation";
import { LANGUAGES } from "../../languages/registry";

const LanguageLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ language: string }>;
}) => {
  const { language } = await params;
  const definition = LANGUAGES[language];

  if (!definition || !definition.enabled) {
    redirect("/");
  }

  return <>{children}</>;
};

export default LanguageLayout;
