import BackLink from "./BackLink";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  backTo?: { to: string; label: string } | { onClick: () => void; label: string };
};

const PageHeader = ({ title, subtitle, backTo }: PageHeaderProps) => (
  <div className="page-header">
    {backTo && <BackLink {...backTo} />}
    <h1>{title}</h1>
    {subtitle && <p>{subtitle}</p>}
  </div>
);

export default PageHeader;
