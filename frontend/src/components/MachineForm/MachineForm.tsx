import { useState } from "react";
import type { MachineCreate } from "../../types/Machine";
import React from "react";

interface Props {
  onAddMachine: (machineData: MachineCreate) => Promise<boolean>;
}

const MachineForm = ({ onAddMachine }: Props) => {
  const [formData, setFormData] = useState<MachineCreate>({
    name: "",
    serialNumber: "",
    description: "",
    machineType: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const isNumericValue = name === "machineType";

    setFormData((prevState) => ({
      ...prevState,
      [name]: isNumericValue ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await onAddMachine(formData);
    if (success) {
      setFormData({
        name: "",
        serialNumber: "",
        description: "",
        machineType: 0,
      });
    }
  };

  return (
    <div>
      <h2>Adicionar Nova Máquina</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome da Máquina:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="serialNumber">Número de Série:</label>
          <input
            type="text"
            id="serialNumber"
            name="serialNumber"
            value={formData.serialNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Descrição:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="machineType">Tipo de Máquina:</label>
          <input
            type="number"
            id="machineType"
            name="machineType"
            value={formData.machineType}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Adicionar Máquina</button>
      </form>
    </div>
  );
};

export default MachineForm;
