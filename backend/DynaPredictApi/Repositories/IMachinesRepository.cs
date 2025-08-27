using DynaPredictApi.Models;

namespace DynaPredictApi.Repositories
{
    public interface IMachinesRepository
    {
        Task<IEnumerable<Machine>> GetAllAsync();
        Task<Machine?> GetByIdAsync(int id);
        Task<Machine> AddAsync(Machine machine);
        Task<bool> ExistsAsync(int id);
        Task<bool> DeleteAsync(int id);
    }
}