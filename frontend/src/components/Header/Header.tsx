import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <PrecisionManufacturingIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="div">
            DynaPredict
          </Typography>
        </Box>
        <Button color="inherit" component={Link} to="/">
          <PrecisionManufacturingIcon sx={{ mr: 1 }} />
          Máquinas
        </Button>
        <Button
          color="primary"
          variant="contained"
          startIcon={<AddIcon />}
          component={Link}
          to="/nova-maquina"
        >
          Nova Máquina
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
