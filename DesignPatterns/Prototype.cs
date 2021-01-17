using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRUDWebApp.Controllers
{
    public class Prototype
    {
        // The 'Prototype' interface
        public interface IEmployee
        {
            //IEmployee Clone();
            object Clone();
            string GetDetails();
        }

        // A 'ConcretePrototype' class
        public class Developer : IEmployee
        {
            public string Name { get; set; }
            public string Role { get; set; }
            public string PreferredLanguage { get; set; }

            //public IEmployee Clone()
            //{
            //    // Shallow Copy: only top-level objects are duplicated
            //    return (IEmployee)MemberwiseClone();

            //    // Deep Copy: all objects are duplicated
            //    //return (IEmployee)this.Clone();
            //}

            //Shallow Copy: only top lvl objects are duplicated
            public object Clone() => MemberwiseClone();

            public string GetDetails()
            {
                return string.Format("{0} - {1} - {2}", Name, Role, PreferredLanguage);
            }

        }

        // A 'ConcretePrototype' class
        public class Typist : IEmployee
        {
            public int WordsPerMinute { get; set; }
            public string Name { get; set; }
            public string Role { get; set; }

            public object Clone()
            {
                return MemberwiseClone();
            }

            //public IEmployee Clone()
            //{
            //    // Shallow Copy: only top-level objects are duplicated
            //    return (IEmployee)MemberwiseClone();

            //    // Deep Copy: all objects are duplicated
            //    //return (IEmployee)this.Clone();
            //}

            public string GetDetails()
            {
                return string.Format("{0} - {1} - {2}wpm", Name, Role, WordsPerMinute);
            }
        }

    }
}
