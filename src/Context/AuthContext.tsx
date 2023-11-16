// ** React Imports
import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";

import { useNavigate } from "react-router-dom";

// ** Axios
import axios from "axios";

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  isAuthen: false,
  setUser: () => null,
  setLoading: () => Boolean,
  setIsAuthen: () => Boolean,
  handleLogin: () => null,
  handleLogout: () => null,
  handleRegister: () => null,
};

const AuthContext = createContext(defaultProvider);

interface Props {
  children: ReactNode;
}

interface AuthValuesType {
  loading: boolean;
  setLoading: (value: boolean) => void;
  isAuthen: boolean;
  setIsAuthen: (value: boolean) => void;
  user: User | null;
  setUser: (value: User | null) => void;
  handleLogin: (value: LoginData) => void,
  handleLogout: () => void,
  handleRegister: (value : RegisterData) => void,
}

interface User {
  email: string;
  fullname: string;
  userId: number;
  role: string;
  iat: number;
  exp: number;
}

interface LoginData {
  username: string;
  password: string;
}

interface RegisterData {
  username: string;
    password: string;
    fname: string;
    lname: string;
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<User | null>(defaultProvider.user);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);
  const [isAuthen, setIsAuthen] = useState<boolean>(defaultProvider.loading);

  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = () => {
      const token = window.localStorage.getItem("token")!;
      if (token) {
        setLoading(true);
        axios({
          method: "post",
          maxBodyLength: Infinity,
          url: `http://localhost:3100/authentication`,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
          .then((res) => {
            console.log("Authentication response", res.data);
            if (res.data.status === "ok") {
              setLoading(false);
              setUser({ ...res.data.result });
              setIsAuthen(true);
            } else {
              localStorage.removeItem("token");
              setUser(null);
              setLoading(false);
              setIsAuthen(false);
            }
          })
          .catch((error) => {
            console.log("Authentication Error", error);
            localStorage.removeItem("token");
            setUser(null);
            setLoading(false);
            setIsAuthen(false);
          });
      } else {
        setUser(null);
        setLoading(false);
        setIsAuthen(false);
      }
    };
    initAuth();
  }, []);

  const handleLogin = (loginData: LoginData) => {
    axios({
      method: "post",
      maxBodyLength: Infinity,
      url: `http://localhost:3100/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: loginData,
    })
      .then((res) => {
        console.log("Login response", res.data);
        if (res.data.status === "ok") {
          localStorage.setItem("token", res.data.token);
          axios({
            method: "post",
            maxBodyLength: Infinity,
            url: `http://localhost:3100/authentication`,
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + res.data.token,
            },
          })
            .then((res) => {
              if (res.data.status === "ok") {
                setLoading(false);
                setUser({ ...res.data.result });
                setIsAuthen(true);
                //Redirect to some path
                navigate("/");
              }
            })
            .catch((error) => {
              console.log("Authentication Error", error);
              localStorage.removeItem("token");
              setUser(null);
              setLoading(false);
              setIsAuthen(false);
            });
        }
      })
      .catch((error) => {
        console.log("Login Error", error);
      });
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleRegister = (registerData: RegisterData) => {
    axios({
      method: "post",
      maxBodyLength: Infinity,
      url: `http://localhost:3100/register`,
      headers: {
        "Content-Type": "application/json",
      },
      data: registerData,
    })
      .then((res) => {
        console.log("Register response", res.data);
        if (res.data.status === "ok") {
          //Redirect to some path
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log("Register Error", error);
      });
  };

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    isAuthen,
    setIsAuthen,
    handleLogin,
    handleLogout,
    handleRegister,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider };
