import { useState, useEffect } from "react";
import type { Machine, MachineCreate } from "../../types/Machine";
import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

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

  const [validationErrors, setValidationErrors] = useState({
    name: "",
    serialNumber: "",
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

    const newErrors = { name: "", serialNumber: "" };

    if (!formData.name) {
      newErrors.name = "O nome é obrigatório.";
    }
    if (!formData.serialNumber) {
      newErrors.serialNumber = "O número de série é obrigatório.";
    }

    setValidationErrors(newErrors);

    if (newErrors.name || newErrors.serialNumber) {
      return;
    }

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
    <Box sx={{ p: 3, mb: 3, border: "1px solid #ccc", borderRadius: "8px" }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {machineToEdit ? "Editar Máquina" : "Adicionar Nova Máquina"}
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Nome da Máquina"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={!!validationErrors.name}
          helperText={validationErrors.name}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Número de Série"
          name="serialNumber"
          value={formData.serialNumber}
          onChange={handleChange}
          error={!!validationErrors.serialNumber}
          helperText={validationErrors.serialNumber}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Descrição"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Tipo de Máquina"
          name="machineType"
          type="number"
          value={formData.machineType}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <Button type="submit" variant="contained" color="primary" sx={{ mr: 1 }}>
          {machineToEdit ? "Salvar Edições" : "Adicionar Máquina"}
        </Button>

        {machineToEdit && (
          <Button type="button" onClick={onCancelEdit} variant="contained" color="inherit">
            Cancelar
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default MachineForm;
