import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress, Alert, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import type { Machine } from "../../types/Machine";

const MachineDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [machine, setMachine] = useState<Machine | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMachineDetails = async () => {
      if (!id) {
        setError("ID da máquina não fornecido.");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`http://localhost:5138/api/machines/${id}`);
        if (!response.ok) {
          throw new Error(`Erro ao buscar a máquina: ${response.status}`);
        }
        const data: Machine = await response.json();
        setMachine(data);
      } catch (err) {
        setError("Erro ao carregar os detalhes da máquina.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMachineDetails();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Button
          sx={{ mt: 2 }}
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
        >
          Voltar
        </Button>
      </Box>
    );
  }

  if (!machine) {
    return (
      <Box sx={{ mt: 4 }}>
        <Alert severity="warning">Máquina não encontrada.</Alert>
        <Button
          sx={{ mt: 2 }}
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
        >
          Voltar
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Button
        sx={{ mb: 2 }}
        variant="text"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/")}
      >
        Voltar para Máquinas
      </Button>
      <Typography variant="h4" gutterBottom>
        {machine.name}
      </Typography>
      <Typography variant="body1">**Número de Série:** {machine.serialNumber}</Typography>
      <Typography variant="body1">**Descrição:** {machine.description}</Typography>
      <Typography variant="body1">**Tipo de Máquina:** {machine.machineType}</Typography>
    </Box>
  );
};

export default MachineDetails;
