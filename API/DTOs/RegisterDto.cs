using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        //Its' a good idea to add validations in DTOs. 
        //Also, the validations are handled to the [ApiController]. 
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        [StringLength(40, MinimumLength = 4)]
        public string Password { get; set; }
    }
}