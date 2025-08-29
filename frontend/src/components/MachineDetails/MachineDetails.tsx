import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Card, CardContent, CircularProgress, Alert, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

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

  const InfoCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <Card sx={{ height: "100%", borderRadius: 2, boxShadow: 1 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Button
          sx={{ mr: 2 }}
          variant="text"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
        >
          Voltar para Máquinas
        </Button>
        <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
          {machine.name}
        </Typography>
        <Button variant="outlined" sx={{ mr: 1 }}>
          Editar
        </Button>
        <Button variant="outlined">Configurar</Button>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <Box sx={{ flex: "1 1 48%" }}>
          <InfoCard title="Informações Gerais">
            <Box>
              <Typography variant="body1">**Número de Série:** {machine.serialNumber}</Typography>
              <Typography variant="body1">**Tipo de Máquina:** {machine.machineType}</Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                **Descrição:** {machine.description}
              </Typography>
            </Box>
          </InfoCard>
        </Box>

        <Box sx={{ flex: "1 1 48%" }}>
          <InfoCard title="Status Operacional">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CheckCircleOutlineIcon color="success" sx={{ mr: 1 }} />
              <Typography variant="body1" color="success">
                Operacional
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Última verificação: 28 de agosto de 2025 às 23:00
            </Typography>
          </InfoCard>
        </Box>

        <Box sx={{ flex: "1 1 48%" }}>
          <InfoCard title="Histórico">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AccessTimeIcon color="action" sx={{ mr: 1 }} />
              <Typography variant="body1">Criado em: 28 de agosto de 2025 às 22:00</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              <AccessTimeIcon color="action" sx={{ mr: 1 }} />
              <Typography variant="body1">
                Última atualização: 28 de agosto de 2025 às 23:00
              </Typography>
            </Box>
          </InfoCard>
        </Box>

        <Box sx={{ flex: "1 1 48%" }}>
          <InfoCard title="Ações Rápidas">
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Button variant="contained" sx={{ mb: 1 }}>
                Editar Máquina
              </Button>
              <Button variant="outlined" sx={{ mb: 1 }}>
                Configurações
              </Button>
              <Button variant="outlined">Ver Relatórios</Button>
            </Box>
          </InfoCard>
        </Box>
      </Box>
    </Box>
  );
};

export default MachineDetails;
