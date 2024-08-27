export type User = {
  id?: number;
  password: string;
  firstName: string;
  lastName: string;
  userType?: string;
  email: string;
  status?: string;
  requestStatus?: string;
  phoneNumber: string;
  location: string;
  confPassword?: string;
  createdAt?: string;
  isApproved?: boolean;
  isDisabled?: boolean;
  walletBalance?: number;
};

export type UserStateType = {
  loading: boolean;
  users: User[];
  error: string | null;
  user: User | null;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  location: string;
  confPassword?: string;
  owners: User[];
  ownerRequests: User[];
  customers: User[];
  owner: User | null;
};
