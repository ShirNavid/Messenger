using ProcessModelsLibrary.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProcessModelsLibrary.MainClasses;

public class GridEntity : Entity
{
    [NotBeingSearched]
    public override int Id { get; set; }

    [NotBeingSearched]
    public string Image { get; set; }

    [NotBeingSearched]
    public bool HasBeenPinned { get; set; }

    [NotBeingSearched]
    public bool HasBeenSeen { get; set; }
}
