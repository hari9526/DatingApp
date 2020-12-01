using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class UsersController : BaseApiController
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
            return await _context.Users.ToListAsync();
        }
     
        [HttpGet("{id}")] //For telling that there is an id parameter. 
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            return await _context.Users.FindAsync(id);
        }
 
    }
}