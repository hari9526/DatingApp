using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;
        public UsersController(DataContext context)
        {
            _context = context;
        }
        //We can also use List<AppUser>. 
        //But list has overloads of functions and features like 
        //search, sort and all which is not required at the moment. 
        //Thus we are going for a simple one. 
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUser()
        {
           //async: For asynchronour programming. When the server is busy, 
           //async methods waits or pauses. After the work is completed, the 
           //result is in "Task". For that we wrap our 
           //action method in Task. We get the result from the task with the help of 
           //await key word. 
            return  await _context.User.ToListAsync(); 
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            return await _context.User.FindAsync(id);
        }
    }
}