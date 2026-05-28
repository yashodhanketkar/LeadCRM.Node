import { getLeads } from "@/api/lead";
import type { LeadType } from "@/lib/types";
import { useEffect, useState } from "react";

export const DashbaoardPage = () => {
  const [leads, setLeads] = useState<LeadType[]>();
  useEffect(() => {
    getLeads().then((data) => setLeads(data));
  }, []);

  if (!leads)
    return (
      <div className="h-screen w-screen fixed top-0 right-0 flex justify-center items-center">
        Loading...
      </div>
    );

  const [not_yet_contacted_leads, contacted_leads, converted_leads] =
    LeadsStatus(leads);

  return (
    <div className="mx-auto mt-[35vh] -translate-y-1/2">
      <h1 className="text-4xl">Dashbaoard</h1>
      <p className="text-center mt-6">Here are some stats about your leads</p>
      <table className="mx-auto my-2 border-separate border-spacing-0">
        <thead>
          <tr>
            <th className="text-xl text-center bg-accent/60 text-white">
              Status
            </th>
            <th className="text-xl text-center bg-accent/60 text-white">
              Counts
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Not Yet Contacted</td>
            <td>{not_yet_contacted_leads}</td>
          </tr>
          <tr>
            <td>Contacted</td>
            <td>{contacted_leads}</td>
          </tr>
          <tr>
            <td>Converted</td>
            <td>{converted_leads}</td>
          </tr>
          <tr>
            <td className="bg-accent/30 dark:text-white text-black">Total</td>
            <td className="bg-accent/30 dark:text-white text-black">
              {leads.length}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const LeadsStatus = (leads: LeadType[]): number[] => {
  const not_yet_contacted_leads = leads?.filter(
    (lead) => lead.status === "Not Contacted",
  ).length;
  const contacted_leads = leads?.filter(
    (lead) => lead.status === "Interested" || lead.status === "Not Interested",
  ).length;
  const converted_leads = leads?.filter(
    (lead) => lead.status === "Converted",
  ).length;

  return [not_yet_contacted_leads, contacted_leads, converted_leads];
};
