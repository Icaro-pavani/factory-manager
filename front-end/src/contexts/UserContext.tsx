import { createContext, useState } from "react";
import { Asset, Unit, User } from "../services/api";

interface UserContextInterface {
  user: User | null;
  setUser: (newUser: User | null) => void;
  unit: Unit | null;
  setUnit: (newUnit: Unit | null) => void;
  asset: Asset | null;
  setAsset: (newAsset: Asset | null) => void;
}

interface Props {
  children: React.ReactNode;
}

export const UserContext = createContext<UserContextInterface | null>(null);

export function UserProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [unit, setUnit] = useState<Unit | null>(null);
  const [asset, setAsset] = useState<Asset | null>(null);

  return (
    <UserContext.Provider
      value={{ user, setUser, unit, setUnit, asset, setAsset }}
    >
      {children}
    </UserContext.Provider>
  );
}
