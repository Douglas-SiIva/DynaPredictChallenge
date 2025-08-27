import { useState, useEffect } from "react";
import MachineList from "./components/MachineList/MachineList";
import MachineForm from "./components/MachineForm/MachineForm";
import type { Machine, MachineCreate } from "./types/Machine";

function App() {
  const [machines, setMachines] = useState<Machine[]>([]);

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

  useEffect(() => {
    fetchMachines();
  }, []);

  return (
    <>
      <h1>Gerenciamento de Máquinas</h1>
      <MachineForm onAddMachine={handleAddMachine} />
      <MachineList machines={machines} />
    </>
  );
}

export default App;
