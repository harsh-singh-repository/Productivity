import { auth } from "@clerk/nextjs/server";
import { OrgControl } from "./_components/OrgControl";
import { startCase } from "lodash";
import { Metadata } from "next"; // Import Metadata type

export async function generateMetadata(): Promise<Metadata> {
  const { orgSlug } = auth();

  return {
    title: startCase(orgSlug || "organization"),
  };
}

const OrganisationIdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
};

export default OrganisationIdLayout;