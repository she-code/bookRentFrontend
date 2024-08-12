import { User } from "./userTypes";

export type AuthStateType = {
  loading: boolean;
  error: string | null;
  user: User | null;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  location: string;
  confPassword?: string;
};
export type LoginPayload = {
  email: string;
  password: string;
};
