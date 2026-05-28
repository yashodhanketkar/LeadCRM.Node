import { useForm, type SubmitHandler } from "react-hook-form";
import { LeadsSchema, type LeadsType } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLead } from "@/api/lead";

export const LeadsForm = ({ close }: { close: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadsType>({
    resolver: zodResolver(LeadsSchema),
    defaultValues: {
      name: "",
      phone: "",
      source: "Call",
      status: "Not Contacted",
    },
  });

  const onSubmit: SubmitHandler<LeadsType> = async (data) => {
    const res = await createLead(data as any);
    if (res.status !== 201) {
      console.log("Failed to create lead");
    }
    close();
  };

  const handleClose = () => {
    close();
    reset();
  };

  return (
    <form
      className="flex flex-col gap-2 justify-center"
      onSubmit={handleSubmit(onSubmit)}
      onReset={handleClose}
    >
      <label htmlFor="name">Name</label>
      <input {...register("name")} placeholder="Name" />
      {errors.name && <p>Name is required</p>}
      <label htmlFor="phone">Phone</label>
      <input {...register("phone")} placeholder="Phone" type="tel" />
      {errors.phone && <p>Phone is required</p>}
      <label htmlFor="source">Source</label>
      <select {...register("source")}>
        <option value="Call">Call</option>
        <option value="WhatsApp">WhatsApp</option>
        <option value="Field">Field</option>
      </select>
      {errors.source && <p>Source is required</p>}
      <label htmlFor="status">Status</label>
      <select {...register("status")}>
        <option value="Not Contacted">Not Contacted</option>
        <option value="Interested">Interested</option>
        <option value="Not Interested">Not Interested</option>
        <option value="Converted">Converted</option>
      </select>
      {errors.status && <p>Status is required</p>}
      <button type="submit">Submit</button>
      <button type="reset">Cancel</button>
    </form>
  );
};
