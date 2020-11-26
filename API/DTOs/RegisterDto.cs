using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        //Its' a good idea to add validations in DTOs. 
        //Also, the validations are handled to the [ApiController]. 
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}