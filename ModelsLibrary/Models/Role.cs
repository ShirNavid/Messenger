using ProcessModelsLibrary.MainClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelsLibrary.Models;

public class Role : Entity
{
    public string Name { get; set; }
    
    public virtual ICollection<Account> Accounts { get; set; }
}
