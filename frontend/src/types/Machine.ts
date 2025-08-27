export interface Machine {
  id: number;
  name: string;
  serialNumber: string;
  description: string;
  machineType: number;
}

export type MachineCreate = Omit<Machine, "id">;
