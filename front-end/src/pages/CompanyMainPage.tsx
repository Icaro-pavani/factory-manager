import { DeleteForeverTwoTone, EditTwoTone } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import api, { User } from "../services/api";

export default function CompanyMainPage() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function loadPage() {
      if (!token) return;

      const {
        data: { users },
      } = await api.getCompanyUsers(token);
      setUsers(users);
    }
    loadPage();
  }, [token]);

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
        <Users users={users} />
      </Box>
    </Box>
  );
}

interface UsersProps {
  users: User[];
}

function Users({ users }: UsersProps) {
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
            <EditTwoTone />
            <DeleteForeverTwoTone />
          </Box>
        </Box>
      ))}
    </>
  );
}
