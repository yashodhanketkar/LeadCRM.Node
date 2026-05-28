import type { LeadType } from "@/lib/types";
import { AllStatusOptions } from "./data";

interface ILeadCardProps {
  lead: LeadType;
  handleDelete: (id: number) => Promise<void>;
  handleChange: (
    e: React.ChangeEvent<HTMLSelectElement>,
    id: number,
  ) => Promise<void>;
}

export const LeadCard = ({
  lead,
  handleDelete,
  handleChange,
}: ILeadCardProps) => {
  return (
    <tr className="justify-center items-center">
      <td className="w-fit">{lead.id}</td>
      <td>{lead.name}</td>
      <td>{lead.phone}</td>
      <td>{lead.source}</td>
      <td className="w-full">
        <div className="select flex flex-row w-full">
          <select
            value={lead.status}
            onChange={(e) => handleChange(e, lead.id)}
            className="w-3/4"
          >
            {AllStatusOptions.map((lso) => (
              <option id={"card-" + lso} value={lso}>
                {lso}
              </option>
            ))}
          </select>
          <button onClick={async () => handleDelete(lead.id)} className="w-1/4">
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};
