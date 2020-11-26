using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        //All the controllers require     [ApiControlle] and [Route("api/[controller]")]
        //on top and have to inherited from ControllerBase. 
        //For DRY(Donot Repeat Yourself), we are creating this controller so that other 
        //controllers just have to inherit this controller. 
        //When we inherit we get all the properites, methods and attributes of the base class
        //to the derived class. 
    }
}