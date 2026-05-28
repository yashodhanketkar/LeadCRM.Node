const year = new Date().getFullYear();
const start = 2026;

export const Footer = () => {
  return (
    <footer className="border-t border-border/15 pt-3 p-2 inline-flex justify-between bg-accent/5">
      <div className="flex flex-col text-left">
        <p>CRM - Leads Management</p>
      </div>
      <span className="text-xs mt-auto">
        &copy; {start}
        {year > start && ` – ${year}`} Yashodhan Kektar
      </span>
    </footer>
  );
};
