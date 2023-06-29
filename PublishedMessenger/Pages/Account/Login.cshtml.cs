using DatabaseLibrary;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using ModelsLibrary.Models;
using System.Security.Claims;

namespace Massenger.Pages.Login;

[BindProperties]
public class LoginModel : PageModel
{
    private readonly MyDatabaseContext _db;

    public string Name { get; set; }
    public string Password { get; set; }
    public string ReturnUrl { get; set; }

    public LoginModel(MyDatabaseContext db)
    {
        _db = db;
        _db.SetData();
    }

    public void OnGet(string returnUrl = null)
    {
        ReturnUrl = returnUrl;
    }

    public IActionResult OnPost(string returnUrl = null)
    {
        if (!string.IsNullOrEmpty(Name) && string.IsNullOrEmpty(Password))
        {
            return LocalRedirect("/Account/Login");
        }
        var account = _db.Set<ModelsLibrary.Models.Account>().FirstOrDefault(c => c.Name == Name);
        if (account == null)
        {
            return LocalRedirect("/Account/Login");
        }
        ClaimsIdentity identity = null;
        bool isAuthenticate = false;
        if (Password == account.Password)
        {
            var role = _db.Set<Role>().FirstOrDefault(c => c.Id == account.RoleId);
            identity = new ClaimsIdentity(new[]{
                new Claim(ClaimTypes.NameIdentifier, account.Id.ToString()),
                new Claim(ClaimTypes.Name, Name),
                new Claim(ClaimTypes.Role, role.Name),
            }, CookieAuthenticationDefaults.AuthenticationScheme);
            isAuthenticate = true;
        }
        if (isAuthenticate)
        {
            var principal = new ClaimsPrincipal(identity);
            HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);
            
            return LocalRedirect(ReturnUrl);
        }
        return Page();
    }
}
