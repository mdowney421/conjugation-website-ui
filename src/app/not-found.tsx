import Link from "next/link";
import PageHeader from "../components/PageHeader";

const NotFound = () => (
  <div className="page">
    <PageHeader title="Page not found" subtitle="That page doesn't exist." />
    <div className="empty-state">
      <Link href="/">Go back home</Link>
    </div>
  </div>
);

export default NotFound;
