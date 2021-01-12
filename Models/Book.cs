using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Library.Models
{
    public class Book
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Author { get; set; }
        public DateTime Year { get; set; }
        public string Publisher { get; set; }
        public int Numbers { get; set; }
    }
}