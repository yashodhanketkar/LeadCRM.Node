import { CreateLeads } from "./create/dialog";
import { ListLeads } from "./list";

export const LeadsPage = () => {
  return (
    <div>
      <h1 className="text-4xl mb-4">Leads</h1>
      <ListLeads />
      <CreateLeads />
    </div>
  );
};
