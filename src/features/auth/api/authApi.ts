import { httpClient } from "../../../api/httpclient";
import type {
  AuthSession,
  AuthUser,
  LoginPayload,
  SignUpPayload,
} from "../types/types";
import { unwrap, type DataEnvelope } from "../../../api/api.types";

// TODO: confirm these paths against the API docs.
export const AUTH_ENDPOINTS = {
  login: "/login",
  register: "/register",
  logout: "/logout",
  me: "/me",
} as const;

function toSignUpFormData({
  username,
  email,
  password,
  passwordConfirmation,
  avatar,
}: SignUpPayload): FormData {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("password_confirmation", passwordConfirmation);
  if (avatar) formData.append("avatar", avatar);
  return formData;
}

export const authApi = {
  async login(payload: LoginPayload): Promise<AuthSession> {
    return unwrap(
      await httpClient.post<DataEnvelope<AuthSession>>(
        AUTH_ENDPOINTS.login,
        payload,
        { unauthorized: "throw" },
      ),
    );
  },

  async signUp(payload: SignUpPayload): Promise<AuthSession> {
    return unwrap(
      await httpClient.post<DataEnvelope<AuthSession>>(
        AUTH_ENDPOINTS.register,
        toSignUpFormData(payload),
        { unauthorized: "throw" },
      ),
    );
  },

  async logout(): Promise<void> {
    await httpClient.post(AUTH_ENDPOINTS.logout, undefined, {
      unauthorized: "throw",
    });
  },

  async me(): Promise<AuthUser> {
    return unwrap(
      await httpClient.get<DataEnvelope<AuthUser>>(AUTH_ENDPOINTS.me, {
        unauthorized: "throw",
      }),
    );
  },
};
