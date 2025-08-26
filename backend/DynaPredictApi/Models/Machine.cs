namespace DynaPredictApi.Models
{
    public class Machine
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string SerialNumber { get; set; }
        public string? Description  { get; set; }
        public required MachineType MachineType { get; set; }
    }
}