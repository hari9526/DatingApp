using System;

namespace API.DTOs
{
    //Object that is returned when a user logs in
    public class UserDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime CreatedTime { get; set; }
        public string Token { get; set; }
    }
}