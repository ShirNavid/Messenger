using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using PageLibrary;

namespace Massenger.Pages.Management;

[Authorize(Roles="Admin")]
public class ManagementModel : ExtendedPageModel
{
    public override IActionResult ExtendedOnGet()
    {
        return Page();
    }
}
