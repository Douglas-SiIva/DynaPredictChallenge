namespace DynaPredictApi.Models
{
    public class Machine
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string SerialNumber { get; set; }
        public string Description { get; set; }
        public MachineType MachineType { get; set; }
    }
}