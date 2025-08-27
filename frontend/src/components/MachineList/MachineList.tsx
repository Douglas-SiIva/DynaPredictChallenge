import type { Machine } from "../../types/Machine";

interface Props {
  machines: Machine[];
}

const MachinesList = ({ machines }: Props) => {
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
