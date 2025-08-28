using Microsoft.AspNetCore.Mvc;
using DynaPredictApi.Models;
using DynaPredictApi.Repositories;
using Microsoft.EntityFrameworkCore;

namespace DynaPredictApi.Controllers
{
    [Route("api/machines")]
    [ApiController]
    public class MachinesController : ControllerBase
    {
        private readonly IMachinesRepository _repository;

        public MachinesController(IMachinesRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Machine>>> GetMachines()
        {
            return Ok(await _repository.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Machine>> GetMachine(int id)
        {
            var machine = await _repository.GetByIdAsync(id);

            if (machine == null)
            {
                return NotFound();
            }

            return Ok(machine);
        }

        [HttpPost]
        public async Task<ActionResult<Machine>> PostMachine(Machine machine)
        {
            await _repository.AddAsync(machine);
            return CreatedAtAction(nameof(GetMachine), new { id = machine.Id }, machine);
        }
        
        // CORRIGIDO: Agora usa o repositório e o método `ExistsAsync`
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMachine(int id, Machine machine)
        {
            if (id != machine.Id)
            {
                return BadRequest();
            }
            
            var machineExists = await _repository.ExistsAsync(id);
            if (!machineExists)
            {
                return NotFound();
            }

            // O repositório irá lidar com a lógica de atualização
            await _repository.UpdateAsync(machine);
            
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMachine(int id)
        {
            var machineExists = await _repository.ExistsAsync(id);
            if (!machineExists)
            {
                return NotFound();
            }

            await _repository.DeleteAsync(id);

            return NoContent();
        }
    }
}