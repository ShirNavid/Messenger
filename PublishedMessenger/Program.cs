using DatabaseLibrary;
using DataComponentLibrary.Interfaces;
using DataComponentLibrary.MainClasses;
using GridLibrary.Interfaces;
using GridLibrary.MainClasses;
using Massenger.ProcessClasses.AppHub;
using MessageDisplayerLibrary.Interfaces;
using MessageDisplayerLibrary.MainClasses;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using NotificationManagerLibrary.Interfaces;
using NotificationManagerLibrary.MainClasses;
using SelectAccountLibrary.Interfaces;
using SelectAccountLibrary.MainClasses;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddHttpContextAccessor();
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContextFactory<MyDatabaseContext>(options =>
    options.UseSqlServer(connectionString)
);

builder.Services.AddSingleton(typeof(INotificationManager), typeof(NotificationManager));

builder.Services.AddTransient<MyDatabaseContext>();
builder.Services.AddTransient(typeof(IGrid<>), typeof(Grid<>));
builder.Services.AddTransient(typeof(IDataComponent<>), typeof(DataComponent<>));
builder.Services.AddTransient<ISelectAccount, SelectAccount>();
builder.Services.AddTransient<IMessageDisplayer, MessageDisplayer>();

builder.Services.AddControllersWithViews();
builder.Services.AddSession();
builder.Services.AddRazorPages();
builder.Services.AddSignalR();
builder.Services.AddAntiforgery(o =>
{
    o.HeaderName = "XSRF-TOKEN";
    o.SuppressXFrameOptionsHeader = false;
});
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseSession();

app.UseAuthentication();
app.UseAuthorization();

app.MapRazorPages();

app.MapHub<NotificationHub>("/NotificationHub");

app.Run();
