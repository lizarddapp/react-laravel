export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;

  created_at: string;
  updated_at: string;
  phone: string;
  status: "active" | "inactive";
}

export interface RegisterProps {
  email: string;
  last_name: string;
  first_name: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface UpdateUserProps {
  id: number | string;
  email: string;
  last_name: string;
  first_name: string;
  phone: string;
  status: "active" | "inactive";
}

export interface UserFilterProps {
  name: string;
  email: string;
  phone: string;
}

export interface LoginProps {
  email: string;
  password: string;
}
