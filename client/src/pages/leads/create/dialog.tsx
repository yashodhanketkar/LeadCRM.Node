import { useEffect, useRef, useState } from "react";
import { LeadsForm } from "./form";

export const CreateLeads = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      console.log("show");
      dialog.showModal();
    } else {
      console.log("close");
      dialog.close();
    }
  }, [open]);

  return (
    <>
      <button
        className="fixed bottom-10 right-10 p-2 rounded-md cursor-pointer"
        onClick={openDialog}
      >
        Create Lead
      </button>
      <dialog
        ref={dialogRef}
        onCancel={closeDialog}
        className="mx-auto my-auto bg-background text-foreground p-4 rounded-lg"
      >
        <h2 className="mb-4">Create Leads form</h2>
        <LeadsForm close={closeDialog} />
      </dialog>
    </>
  );
};
