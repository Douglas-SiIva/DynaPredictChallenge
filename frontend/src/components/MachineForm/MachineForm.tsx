import { useState, useEffect } from "react";
import type { Machine, MachineCreate } from "../../types/Machine";
import React from "react";

interface Props {
  onAddMachine: (machineData: MachineCreate) => Promise<boolean>;
  onUpdateMachine: (machineData: Machine) => Promise<boolean>;
  machineToEdit: Machine | null;
  onCancelEdit: () => void;
}

const MachineForm = ({ onAddMachine, onUpdateMachine, machineToEdit, onCancelEdit }: Props) => {
  const [formData, setFormData] = useState<MachineCreate>({
    name: "",
    serialNumber: "",
    description: "",
    machineType: 0,
  });

  useEffect(() => {
    if (machineToEdit) {
      setFormData({
        name: machineToEdit.name,
        serialNumber: machineToEdit.serialNumber,
        description: machineToEdit.description,
        machineType: machineToEdit.machineType,
      });
    } else {
      setFormData({
        name: "",
        serialNumber: "",
        description: "",
        machineType: 0,
      });
    }
  }, [machineToEdit]);

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
    let success = false;

    if (machineToEdit) {
      success = await onUpdateMachine({
        ...formData,
        id: machineToEdit.id,
      });
    } else {
      success = await onAddMachine(formData);
    }

    if (success) {
      onCancelEdit();
    }
  };

  return (
    <div>
      <h2>{machineToEdit ? "Editar Máquina" : "Adicionar Nova Máquina"}</h2>
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
        <button type="submit">{machineToEdit ? "Salvar Edições" : "Adicionar Máquina"}</button>
        {machineToEdit && (
          <button type="button" onClick={onCancelEdit}>
            Cancelar
          </button>
        )}
      </form>
    </div>
  );
};

export default MachineForm;
