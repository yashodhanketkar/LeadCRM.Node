import { register } from "../../api/user";
import { AuthForm } from "./form";
import type { AuthSchemaType } from "./schema";

export const RegisterPage = () => {
  const handleLogin = async (data: AuthSchemaType) => {
    const res = await register(data);
    if (res.status === 201) {
      window.location.href = "/";
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <AuthForm submitHandle={handleLogin} />
    </div>
  );
};
