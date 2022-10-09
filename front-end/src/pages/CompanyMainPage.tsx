import { DeleteForeverTwoTone, EditTwoTone } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import api, { User } from "../services/api";

export default function CompanyMainPage() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    async function loadPage() {
      if (!token) return;

      const {
        data: { users },
      } = await api.getCompanyUsers(token);
      setUsers(users);
    }
    loadPage();
  }, [token, reload]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        variant="contained"
        onClick={() => navigate("/app/company/add-user")}
      >
        Add User
      </Button>
      <Box>
        <Users users={users} reload={reload} setReload={setReload} />
      </Box>
    </Box>
  );
}

interface UsersProps {
  users: User[];
  reload: boolean;
  setReload: (reload: boolean) => void;
}

function Users({ users, setReload, reload }: UsersProps) {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const { token } = useAuth();

  function handleEdit(user: User) {
    setUser(user);
    navigate("/app/company/add-user");
  }

  async function handleDelete(userId: string) {
    if (window.confirm("Are you sure about deleting this user?")) {
      if (!token) {
        return navigate("/");
      }
      await api.deleteCompanyUser(token, userId);
      setReload(!reload);
    }
  }

  return (
    <>
      {users.map((user: User) => (
        <Box
          key={user._id}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography>
            {user.name} - CPF: {user.cpf}
          </Typography>
          <Box sx={{ display: "flex" }}>
            <EditTwoTone
              sx={{ cursor: "pointer" }}
              onClick={() => handleEdit(user)}
            />
            <DeleteForeverTwoTone
              sx={{ cursor: "pointer" }}
              onClick={() => handleDelete(user._id)}
            />
          </Box>
        </Box>
      ))}
    </>
  );
}
