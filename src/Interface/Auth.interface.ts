export interface AuthValuesType {
  loading: boolean;
  setLoading: (value: boolean) => void;
  isAuthen: boolean;
  setIsAuthen: (value: boolean) => void;
  user: User | null;
  setUser: (value: User | null) => void;
  handleLogin: (value: LoginData) => void;
  handleLogout: () => void;
  handleRegister: (value: RegisterData) => void;
}

export interface User {
  email: string;
  fullname: string;
  userId: number;
  role: string;
  iat: number;
  exp: number;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  fname: string;
  lname: string;
}
