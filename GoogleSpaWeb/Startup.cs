using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Authentication;
using System.Text.Encodings.Web;

namespace GoogleSpaWeb
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            services.AddCors(corsOptions =>
            {
                corsOptions.AddPolicy("fully permissive", configurePolicy => configurePolicy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200").AllowCredentials()); //localhost:4200 is the default port an angular runs in dev mode with ng serve
            });

            services.AddDbContext<IdentityDbContext>(options =>
                        options.UseSqlite("Data Source=users.sqlite",
                        sqliteOptions => sqliteOptions.MigrationsAssembly("GoogleSpaWeb")));
            services.AddIdentity<IdentityUser, IdentityRole>()
                    .AddEntityFrameworkStores<IdentityDbContext>()
                    .AddDefaultTokenProviders();

            services.AddAuthentication(options =>
            {
                options.DefaultSignOutScheme = IdentityConstants.ApplicationScheme;
            })
            .AddGoogle("Google", options =>
            {
                options.CallbackPath = new PathString("/google-callback");
                options.ClientId = "385606584586-c322eh58j4egl7knk0n7a27ktnks7kcs.apps.googleusercontent.com";
                options.ClientSecret = "XYU5GuWRV30RQULhgaNTn7L6";
                options.Events = new OAuthEvents
                {
                    OnRemoteFailure = (RemoteFailureContext context) =>
                    {                        
                        context.Response.Redirect("/home/denied");
                        context.HandleResponse();
                        return Task.CompletedTask;
                    }
                };
        });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("fully permissive");

            app.UseAuthentication();

            app.UseMvcWithDefaultRoute();
        }
    }
}
