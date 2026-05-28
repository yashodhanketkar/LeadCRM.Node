import { useNavigate } from "react-router";

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto mt-[35vh] -translate-y-1/2">
      <h1 className="text-4xl mb-2">CRM - Leads Management</h1>
      <p className="my-8 mb-2 text-center!">
        Please select an option to continue...
      </p>
      <div className="flex flex-col gap-2 mx-auto w-fit">
        <button className="py-2 px-4" onClick={() => navigate("/dashboard")}>
          Go to dashboard
        </button>
        <button className="py-2 px-4" onClick={() => navigate("/leads")}>
          Go to leads
        </button>
      </div>
    </div>
  );
};
