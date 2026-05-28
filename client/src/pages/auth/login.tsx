import { login } from "../../api/user";
import { authStore } from "../../store/auth";
import { AuthForm } from "./form";
import type { AuthSchemaType } from "./schema";

export const LoginPage = () => {
  const { setToken } = authStore();

  const handleLogin = async (data: AuthSchemaType) => {
    const res = await login(data);
    setToken(res.token);
    window.location.href = "/";
  };

  return (
    <div>
      <h1>Login</h1>
      <AuthForm submitHandle={handleLogin} />
    </div>
  );
};
