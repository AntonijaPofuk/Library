using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace CRUDWebApp.Controllers
{
    public class Builder
    {
        /// The 'Builder' interface
        public interface IVehicleBuilder
        {
            void SetModel();
            void SetEngine();
            void SetTransmission();
            void SetBody();
            void SetAccessories();
            Vehicle GetVehicle();
        }

        /// The 'ConcreteBuilder1' class
        public class HeroBuilder : IVehicleBuilder
        {
            Vehicle objVehicle = new Vehicle();
            public void SetModel()
            {
                objVehicle.Model = "Hero";
            }

            public void SetEngine()
            {
                objVehicle.Engine = "4 Stroke";
            }

            public void SetTransmission()
            {
                objVehicle.Transmission = "120 km/hr";
            }

            public void SetBody()
            {
                objVehicle.Body = "Plastic";
            }

            public void SetAccessories()
            {
                objVehicle.Accessories.Add("Seat Cover");
                objVehicle.Accessories.Add("Rear Mirror");
            }

            public Vehicle GetVehicle()
            {
                return objVehicle;
            }
        }

        /// The 'ConcreteBuilder2' class
        public class HondaBuilder : IVehicleBuilder
        {
            Vehicle objVehicle = new Vehicle();
            public void SetModel()
            {
                objVehicle.Model = "Honda";
            }

            public void SetEngine()
            {
                objVehicle.Engine = "4 Stroke";
            }

            public void SetTransmission()
            {
                objVehicle.Transmission = "125 Km/hr";
            }

            public void SetBody()
            {
                objVehicle.Body = "Plastic";
            }

            public void SetAccessories()
            {
                objVehicle.Accessories.Add("Seat Cover");
                objVehicle.Accessories.Add("Rear Mirror");
                objVehicle.Accessories.Add("Helmet");
            }

            public Vehicle GetVehicle()
            {
                return objVehicle;
            }
        }

        /// The 'Product' class
        public class Vehicle
        {
            public string Model { get; set; }
            public string Engine { get; set; }
            public string Transmission { get; set; }
            public string Body { get; set; }
            public List<string> Accessories { get; set; }

            public Vehicle()
            {
                Accessories = new List<string>();
            }

            public void ShowInfo()
            {
                Debug.WriteLine("Model: {0}", Model);
                Debug.WriteLine("Engine: {0}", Engine);
                Debug.WriteLine("Body: {0}", Body);
                Debug.WriteLine("Transmission: {0}", Transmission);
                Debug.WriteLine("Accessories:");
                foreach (var accessory in Accessories)
                {
                    Debug.WriteLine("\t{0}", accessory);
                }
            }
        }

        /// The 'Director' class
        public class VehicleCreator
        {
            private readonly IVehicleBuilder objBuilder;

            public VehicleCreator(IVehicleBuilder builder)
            {
                objBuilder = builder;
            }

            public void CreateVehicle()
            {
                objBuilder.SetModel();
                objBuilder.SetEngine();
                objBuilder.SetBody();
                objBuilder.SetTransmission();
                objBuilder.SetAccessories();
            }

            public Vehicle GetVehicle()
            {
                return objBuilder.GetVehicle();
            }
        }

      
    }
}
