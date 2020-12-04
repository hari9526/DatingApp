using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using API.Errors;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;
        public ExceptionMiddleware(RequestDelegate next,
         ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            _env = env;
            _logger = logger;
            _next = next;


        }
        public async Task InvokeAsync(HttpContext context)
        {
            //This middleware will be at the top of the 
            //middlewares in configure method. 
            //We pass the context method to the next middleware 
            //in the list. If there is any error or exception in the 
            //middlewares those errors or exception will go up the line to 
            //this particular middleware and since we have the exception handling here
            //we can the details of the exception. 
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                //This is for showing the error in the terminal
                _logger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var response = _env.IsDevelopment()
                                ? new APIException(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString())
                                : new APIException(context.Response.StatusCode, "Internal Server Error");
                var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
                

                var json = JsonSerializer.Serialize(response, options); 

                await context.Response.WriteAsync(json);
            }

        }
    }
}