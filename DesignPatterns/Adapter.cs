using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace CRUDWebApp.DesignPatterns
{
       public interface IPeelable {
         void Peel();

    }

    public class Orange : IPeelable
    {
        public void Peel()
        {
            Debug.WriteLine("Peel a orange.");
        }
    }

    public class Banana : IPeelable
    {
        public void Peel()
        {
            Debug.WriteLine("Peel a banana.");
        }
    }

    public interface ISkinnable
    {
        void Skin();
    }

    public class Apple : ISkinnable
    {
        public void Skin()
        {
            Debug.WriteLine("Skin an apple.");
        }
    }

    public class Pear : ISkinnable
    {
        public void Skin()
        {
            Debug.WriteLine("Skin an pear.");
        }
    }

    internal class SkinnableTOPelableAdapter : IPeelable
    {
        private ISkinnable _skinable;

        public SkinnableTOPelableAdapter(ISkinnable NotSkinable)
        {
            this._skinable = NotSkinable;
        }

        public void Peel()
        {
            _skinable.Skin();
        }
    }
}

