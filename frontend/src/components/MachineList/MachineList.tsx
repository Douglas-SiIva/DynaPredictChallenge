import type { Machine } from "../../types/Machine";

interface Props {
  machines: Machine[];
  onDeleteMachine: (id: number) => Promise<void>;
  onEditMachine: (machine: Machine) => void;
}

const MachinesList = ({ machines, onDeleteMachine, onEditMachine }: Props) => {
  return (
    <div>
      <h2>Lista de Máquinas</h2>
      {machines.length > 0 ? (
        <ul>
          {machines.map((machine) => (
            <li key={machine.id}>
              {machine.name} - {machine.serialNumber}
              <button onClick={() => onDeleteMachine(machine.id)}>Excluir</button>
              <button onClick={() => onEditMachine(machine)}>Editar</button>
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
