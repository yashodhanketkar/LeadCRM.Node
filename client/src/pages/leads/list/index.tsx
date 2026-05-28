import { getLeads, updateLead, deleteLead } from "@/api/lead";
import type { LeadStatus, LeadType } from "@/lib/types";
import { useEffect, useState } from "react";
import { AllSourceOptions, AllStatusOptions, type FilterType } from "./data";
import { SourceFilter, StatusFilter } from "./filters";
import { LeadCard } from "./card";

export const ListLeads = () => {
  const [leads, setLeads] = useState<LeadType[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterType>({
    source: AllSourceOptions,
    status: AllStatusOptions,
  });

  const handleDelete = async (id: number) => {
    await deleteLead(id);
    setLeads((prev) => prev?.filter((l) => l.id !== id) ?? []);
  };

  const handleChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
    id: number,
  ) => {
    const newStatus = e.target.value as LeadStatus;
    if (newStatus === undefined) return;

    try {
      updateLead(id, { status: newStatus });
      setLeads((prev) =>
        prev?.map((l) => (l.id === id ? { ...l, status: newStatus } : l)),
      );
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getLeads().then((s) => {
      setLeads(s);
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <div className="h-screen w-screen fixed top-0 right-0 flex justify-center items-center">
        Loading...
      </div>
    );

  return (
    <div>
      <p>List Leads</p>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th colSpan={5} className="text-right bg-transparent border-none">
              <SourceFilter filter={filters} setFilter={setFilters} />
              <StatusFilter filter={filters} setFilter={setFilters} />
            </th>
          </tr>
          <tr>
            <th className="w-fit">ID</th>
            {["name", "phone", "source", "status"].map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {leads
            ?.filter((lead) => {
              return (
                filters.source.includes(lead.source!) &&
                filters.status.includes(lead.status!)
              );
            })
            .map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                handleDelete={handleDelete}
                handleChange={handleChange}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};
