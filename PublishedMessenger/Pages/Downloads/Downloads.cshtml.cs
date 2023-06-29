using DatabaseLibrary;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using ModelsLibrary.Models;

namespace Massenger.Pages.Downloads;

public class DownloadsModel : PageModel
{
    private readonly MyDatabaseContext _db;
    public DownloadsModel(MyDatabaseContext db)
    {
        _db = db;
    }

    public IActionResult OnGet(int id)
    {
        var fileData = _db.Set<FileData>().FirstOrDefault(c => c.Id == id);
        var actionResult = File(fileData.Content, "application/octet-stream", fileData.Name);
        return actionResult;
    }
}

