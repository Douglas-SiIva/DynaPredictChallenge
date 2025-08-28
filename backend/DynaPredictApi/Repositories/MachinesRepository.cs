using DynaPredictApi.Data;
using DynaPredictApi.Models;
using Microsoft.EntityFrameworkCore;

namespace DynaPredictApi.Repositories
{
    public class MachinesRepository : IMachinesRepository
    {
        private readonly AppDbContext _context;

        public MachinesRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Machine>> GetAllAsync()
        {
            return await _context.Machines.ToListAsync();
        }

        public async Task<Machine?> GetByIdAsync(int id)
        {
            return await _context.Machines.FindAsync(id);
        }

        public async Task<Machine> AddAsync(Machine machine)
        {
            _context.Machines.Add(machine);
            await _context.SaveChangesAsync();
            return machine;
        }

        public async Task<bool> ExistsAsync(int id)
        {
            return await _context.Machines.AnyAsync(e => e.Id == id);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var machine = await _context.Machines.FindAsync(id);
            if (machine == null)
            {
                return false;
            }

            _context.Machines.Remove(machine);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task UpdateAsync(Machine machine)
        {
            _context.Entry(machine).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}