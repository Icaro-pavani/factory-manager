import { createContext, useState } from "react";
import { User } from "../services/api";

// type UserBody = Partial<User>;

interface UserContextInterface {
  user: User | null;
  setUser: (newUser: User | null) => void;
}

interface Props {
  children: React.ReactNode;
}

export const UserContext = createContext<UserContextInterface | null>(null);

export function UserProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
