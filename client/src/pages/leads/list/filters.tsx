import type { LeadSource, LeadStatus } from "@/lib/types";
import { AllSourceOptions, AllStatusOptions, type FilterType } from "./data";

interface IFilterProps {
  filter: FilterType;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
}

export const SourceFilter = ({ filter, setFilter }: IFilterProps) => {
  return (
    <select
      className="w-fit bg-white"
      onChange={(e) =>
        setFilter({
          ...filter,
          source:
            e.target.value === "All"
              ? AllSourceOptions
              : [e.target.value as LeadSource],
        })
      }
    >
      <option value="All">All</option>
      <option value="Call">Call</option>
      <option value="WhatsApp">WhatsApp</option>
      <option value="Field">Field</option>
    </select>
  );
};

export const StatusFilter = ({ filter, setFilter }: IFilterProps) => {
  return (
    <select
      className="w-fit bg-white"
      onChange={(e) =>
        setFilter({
          ...filter,
          status:
            e.target.value === "All"
              ? AllStatusOptions
              : [e.target.value as LeadStatus],
        })
      }
    >
      <option value="All">All</option>
      {AllStatusOptions.map((lso) => (
        <option id={"filter-" + lso} value={lso}>
          {lso}
        </option>
      ))}
    </select>
  );
};
