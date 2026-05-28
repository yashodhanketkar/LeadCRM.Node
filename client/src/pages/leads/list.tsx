import { getLeads, updateLead, deleteLead } from "../../api/lead";
import type { LeadStatus, LeadType } from "../../lib/types";
import { useEffect, useState } from "react";

export const ListLeads = () => {
  const [leads, setLeads] = useState<LeadType[]>();

  const handleDelete = async (id: number) => {
    deleteLead(id).then(() =>
      getLeads().then((s) => {
        setLeads(s.filter((l) => l.id !== id));
      }),
    );
  };

  useEffect(() => {
    getLeads().then((s) => setLeads(s));
  }, []);

  return (
    <div>
      List Leads
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="w-fit">ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Source</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leads?.map((lead) => (
            <LeadCard key={lead.id} lead={lead} handleDelete={handleDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const LeadCard = ({
  lead,
  handleDelete,
}: {
  lead: LeadType;
  handleDelete: (id: number) => void;
}) => {
  const [status, setStatus] = useState(lead.status);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as LeadStatus;
    if (newStatus === undefined) return;

    updateLead(lead.id, { status: newStatus });
    setStatus(newStatus);
  };

  return (
    <tr className="justify-center items-center">
      <td className="w-fit">{lead.id}</td>
      <td>{lead.name}</td>
      <td>{lead.phone}</td>
      <td>{lead.source}</td>
      <td className="select flex flex-row w-full">
        <select value={status} onChange={handleChange} className="w-3/4">
          <option value="Not Contacted">Not Contacted</option>
          <option value="Interested">Interested</option>
          <option value="Not Interested">Not Interested</option>
          <option value="Converted">Converted</option>
        </select>
        <button onClick={async () => handleDelete(lead.id)} className="w-1/4">
          Delete
        </button>
      </td>
    </tr>
  );
};
