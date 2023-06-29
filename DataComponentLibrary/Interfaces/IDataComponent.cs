using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataComponentLibrary.Interfaces;

public interface IDataComponent<T>
{
    T Data { get; set; }
}
