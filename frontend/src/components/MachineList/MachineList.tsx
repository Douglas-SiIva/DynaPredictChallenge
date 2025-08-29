import { Typography, Grid, Card, CardContent, CardActions, Button, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Machine } from "../../types/Machine";
import { Link } from "react-router-dom";

interface Props {
  machines: Machine[];
  onDeleteMachine: (id: number) => Promise<boolean>;
  onEditMachine: (machine: Machine) => void;
}

const MachinesList = ({ machines, onDeleteMachine, onEditMachine }: Props) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Lista de Máquinas
      </Typography>
      {machines.length > 0 ? (
        <Grid container spacing={2}>
          {machines.map((machine) => (
            <Box
              key={machine.id}
              sx={{
                p: 2,
                flexBasis: { xs: "100%", sm: "50%", md: "33.33%" },
                maxWidth: { xs: "100%", sm: "50%", md: "33.33%" },
              }}
            >
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="div">
                    {machine.name}
                  </Typography>
                  <Typography color="text.secondary">N/S: {machine.serialNumber}</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {machine.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" component={Link} to={`/maquina/${machine.id}`}>
                    Detalhes
                  </Button>
                  <Button
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => onEditMachine(machine)}
                  >
                    Editar
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => onDeleteMachine(machine.id)}
                  >
                    Excluir
                  </Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1">Nenhuma máquina encontrada.</Typography>
      )}
    </Box>
  );
};

export default MachinesList;
