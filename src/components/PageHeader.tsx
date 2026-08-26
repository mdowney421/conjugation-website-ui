import Link from "next/link";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  backTo?: { to: string; label: string };
};

const PageHeader = ({ title, subtitle, backTo }: PageHeaderProps) => (
  <div className="page-header">
    {backTo && (
      <Link href={backTo.to} className="back-link">
        {backTo.label}
      </Link>
    )}
    <h1>{title}</h1>
    {subtitle && <p>{subtitle}</p>}
  </div>
);

export default PageHeader;
