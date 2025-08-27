import { useEffect, useState } from "react";
import type { Machine } from "../../types/Machine";

const MachinesList = () => {
  const [machines, setMachines] = useState<Machine[]>([]);

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await fetch("http://localhost:5138/api/machines");
        if (!response.ok) {
          throw new Error("Erro ao buscar as máquinas");
        }
        const data: Machine[] = await response.json();
        setMachines(data);
      } catch (error) {
        console.error("Houve um erro!", error);
      }
    };

    fetchMachines();
  }, []);

  return (
    <div>
      <h2>Lista de Máquinas</h2>
      {machines.length > 0 ? (
        <ul>
          {machines.map((machine) => (
            <li key={machine.id}>
              {machine.name} - {machine.serialNumber}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma máquina encontrada.</p>
      )}
    </div>
  );
};

export default MachinesList;
