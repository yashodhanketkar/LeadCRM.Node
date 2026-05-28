import { useForm, type SubmitHandler } from "react-hook-form";
import { AuthSchema, type AuthSchemaType } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";

export const AuthForm = ({
  submitHandle,
}: {
  submitHandle: (data: AuthSchemaType) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthSchemaType>({
    resolver: zodResolver(AuthSchema),
    defaultValues: { username: "", password: "" },
  });

  const formSumbit: SubmitHandler<AuthSchemaType> = (data) => {
    submitHandle(data);
  };

  return (
    <div>
      <form
        className="flex flex-col gap-2 justify-center items-center"
        onSubmit={handleSubmit(formSumbit)}
        onReset={() => reset()}
      >
        <label htmlFor="username">Username</label>
        <input placeholder="Username" {...register("username")} />
        {errors.username && <p>Username is required</p>}
        <label htmlFor="password">Password</label>
        <input
          placeholder="Username"
          {...register("password")}
          type="password"
        />
        {errors.password && <p>Password is required</p>}
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </form>
    </div>
  );
};
