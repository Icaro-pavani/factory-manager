import { DeleteForeverTwoTone, EditTwoTone } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
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
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "560px",
        margin: "50px auto",
        minHeight: "600px",
        padding: "15px",
      }}
      elevation={6}
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
    </Paper>
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

  useEffect(() => {
    setUser(null);
  }, [setUser]);

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
      {users.length === 0 ? (
        <Typography variant="h6">There is no user registered!</Typography>
      ) : (
        users.map((user: User) => (
          <Paper
            key={user._id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
              backgroundColor: "#a1e4ff",
              width: "300px",
              padding: "5px",
            }}
          >
            <Box>
              <Typography>Name: {user.name}</Typography>
              <Typography>CPF: {user.cpf}</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <EditTwoTone
                sx={{ cursor: "pointer" }}
                onClick={() => handleEdit(user)}
              />
              <DeleteForeverTwoTone
                sx={{ cursor: "pointer" }}
                onClick={async () => await handleDelete(user._id)}
              />
            </Box>
          </Paper>
        ))
      )}
    </>
  );
}
