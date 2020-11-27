namespace API.DTOs
{
    //Object that is returned when a user logs in
    public class UserDto
    {
        public string Username { get; set; }
        public string Token { get; set; }
    }
}