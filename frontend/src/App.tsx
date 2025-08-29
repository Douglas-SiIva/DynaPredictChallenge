import { useState, useEffect } from "react";
import MachineList from "./components/MachineList/MachineList";
import MachineForm from "./components/MachineForm/MachineForm";
import type { Machine, MachineCreate } from "./types/Machine";
import { Container, CssBaseline } from "@mui/material";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MachineDetails from "./components/MachineDetails/MachineDetails";

function App() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [machineToEdit, setMachineToEdit] = useState<Machine | null>(null);

  const fetchMachines = async () => {
    try {
      const response = await fetch("http://localhost:5138/api/machines");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMachines(data);
    } catch (error) {
      console.error("Houve um erro!", error);
    }
  };

  const handleAddMachine = async (machineData: MachineCreate) => {
    try {
      const response = await fetch("http://localhost:5138/api/machines", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(machineData),
      });

      if (response.ok) {
        console.log("Máquina adicionada com sucesso!");
        fetchMachines();
      } else {
        console.error("Erro ao adicionar máquina:", response.statusText);
      }
      return response.ok;
    } catch (error) {
      console.error("Houve um erro na requisição:", error);
      return false;
    }
  };

  const handleDeleteMachine = async (machineId: number) => {
    try {
      const response = await fetch(`http://localhost:5138/api/machines/${machineId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log(`Máquina com ID ${machineId} excluída com sucesso!`);
        fetchMachines();
        return true;
      } else {
        console.error("Erro ao excluir máquina:", response.statusText);
        return false;
      }
    } catch (error) {
      console.error("Houve um erro na requisição:", error);
      return false;
    }
  };

  const handleEditMachine = (machine: Machine) => {
    setMachineToEdit(machine);
  };

  const handleUpdateMachine = async (machineData: Machine) => {
    try {
      const response = await fetch(`http://localhost:5138/api/machines/${machineData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(machineData),
      });

      if (response.ok) {
        console.log("Máquina atualizada com sucesso!");
        fetchMachines();
      } else {
        console.error("Erro ao atualizar máquina:", response.statusText);
      }
      return response.ok;
    } catch (error) {
      console.error("Houve um erro na requisição:", error);
      return false;
    }
  };

  const handleCancelEdit = () => {
    setMachineToEdit(null);
  };

  useEffect(() => {
    fetchMachines();
  }, []);

  return (
    <BrowserRouter>
      <CssBaseline />
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route
            path="/"
            element={
              <MachineList
                machines={machines}
                onDeleteMachine={handleDeleteMachine}
                onEditMachine={handleEditMachine}
              />
            }
          />

          <Route
            path="/nova-maquina"
            element={
              <MachineForm
                onAddMachine={handleAddMachine}
                onUpdateMachine={handleUpdateMachine}
                machineToEdit={machineToEdit}
                onCancelEdit={handleCancelEdit}
              />
            }
          />

          <Route path="/maquina/:id" element={<MachineDetails />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
