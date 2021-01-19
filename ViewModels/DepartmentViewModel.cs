using Library.Models;
using System.Collections.Generic;

namespace Library.ViewModels
{
    public class DepartmentViewModel
    {
        public IEnumerable<Departmen> Departments { get; set; }
        public IEnumerable<Book> Books { get; set; }
    }
}