using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace CRUDWebApp.DesignPatterns
{
    public interface INest
    {        void Access(string name);
    }

    public class RealNest : INest
    {
        public void Access(string name)
        {
            Debug.WriteLine($"{name} has access to the nest");
        }
    }

    public class SecureNestProxy : INest
    {
        private readonly RealNest nest; //creating surrogate object
        public SecureNestProxy(RealNest nest)
        {
            this.nest = nest;
        }

        public void Access(string name)
        {
            if (name == "TRex" || name == "Gigantosaurus")
            {
                Debug.WriteLine($"!!!!!!!!!!!!!!{name} is not allowed to access the nest.");
            }
            else
            {
                this.nest.Access(name);
            }
        }
    }
}
