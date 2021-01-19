using CRUDWebApp.DesignPatterns;
using CRUDWebApp.DesignPatterns.Decorator;
using Library.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using static CRUDWebApp.Controllers.Prototype;

namespace Library.Controllers
{
    public class HomeController : Controller
    {
        private LibraryDBEntities db = new LibraryDBEntities();

        public ActionResult Index(int? searchString)
        {
            
                var viewModel = new ViewModels.DepartmentViewModel();
                viewModel.Books = db.Books.Where(b => b.Year > searchString);
           
            ViewBag.Title = "Home Page";

            //Prototype
            PrototypeCalling();

            //Decorator
            DecoratorCalling();

            //Adapter
            AdapterCalling();

            //Composite
            CompositeCalling();

            //Proxy
            ProxyCalling();

            //Iterator
            IteratorCalling();

            //State
            StateCalling();

            //Command
            CommandCalling();

            //Mediator
            MediatorCalling();

            return View(viewModel);

            void CommandCalling()
            {
                Console.WriteLine("Enter Commands (ON/OFF) : ");
                string input = "ON"; //Console.ReadLine();
                Light light = new Light();
                ICommand switchUp = new FlipUpCommand(light);
                ICommand switchDown = new FlipDownCommand(light);
                CRUDWebApp.DesignPatterns.Switch s = new CRUDWebApp.DesignPatterns.Switch();
                if (input == "ON")
                {
                    s.StoreAndExecute(switchUp);
                }
                else if (input == "OFF")
                {
                    s.StoreAndExecute(switchDown);
                }
                else
                {
                    Debug.WriteLine("Command \"ON\" or \"OFF\" is required.");
                    //Console.log("Command \"ON\" or \"OFF\" is required.");
                }
            }

            void StateCalling()
            {
                Steak steak = new Steak("T-Bone");
                steak.AddTemp(120);
                steak.AddTemp(15);
                steak.AddTemp(15);
                steak.RemoveTemp(10);
                steak.RemoveTemp(15);
                steak.AddTemp(20);
                steak.AddTemp(20);
                steak.AddTemp(20);
            }

            void IteratorCalling()
            {
                // The client code may or may not know about the Concrete Iterator
                // or Collection classes, depending on the level of indirection you
                // want to keep in your program.
                var collection = new WordsCollection();
                collection.AddItem("First");
                collection.AddItem("Second");
                collection.AddItem("Third");
                Debug.WriteLine("Straight traversal:");
                foreach (var element in collection)
                {
                    Debug.WriteLine(element);
                }
                Debug.WriteLine("\nReverse traversal:");
                collection.ReverseDirection();
                foreach (var element in collection)
                {
                    Debug.WriteLine(element);
                }
            }

            void ProxyCalling()
            {
                var secureNestProxy = new SecureNestProxy(new RealNest());
                secureNestProxy.Access("Stegosaurus");
                secureNestProxy.Access("TRex");
            }

            void CompositeCalling()
            {
                var plants = new List<IPlant>();
                var branchI = new Branch(new List<IPlant>() { new Leaf(), new Leaf() });
                var branchII = new Branch(new List<IPlant>() { new Leaf(), new Leaf(), new Leaf(), new Leaf() });

                plants.Add(new Branch(
                    new List<IPlant>()
                        { branchI, branchII }
                ));   //branch with two branches
                plants.Add(new Leaf());  //one leaf            
                plants.Add(new Branch(new List<IPlant>() { new Leaf(), new Leaf(), new Leaf(), new Leaf(), new Leaf() })); //one branch with leafs
                plants.Add(new Leaf());  //one leaf
                foreach (IPlant plant in plants)
                {
                    plant.Eat();
                }
            }

            void AdapterCalling()
            {
                var bagOfPeelableFruit = new List<IPeelable>();
                bagOfPeelableFruit.Add(new Orange());
                bagOfPeelableFruit.Add(new Banana());
                bagOfPeelableFruit.Add(new SkinnableTOPelableAdapter(new Apple()));
                bagOfPeelableFruit.Add(new SkinnableTOPelableAdapter(new Pear()));
                foreach (var fruit in bagOfPeelableFruit)
                {
                    fruit.Peel();
                }
            }

            void DecoratorCalling()
            {
                IPizza pizza = new Pizza();
                IPizza cheeseDecorator = new CheeseDecorator(pizza);
                IPizza tomatoDecorator = new TomatoDecorator(cheeseDecorator);
                IPizza onionDecorator = new OnionDecorator(tomatoDecorator);
                Debug.WriteLine(tomatoDecorator.getPizzaType());
            }

            void PrototypeCalling()
            {
                Developer dev = new Developer();
                dev.Name = "Ann";
                dev.Role = "Team Leader";
                dev.PreferredLanguage = "C#";
                Developer devCopy = (Developer)dev.Clone();
                devCopy.Name = "Anna"; //Not mention Role and PreferredLanguage, it will copy above
                Debug.WriteLine(dev.GetDetails());
                Debug.WriteLine(devCopy.GetDetails());
                Typist typist = new Typist();
                typist.Name = "Beta";
                typist.Role = "Typist";
                typist.WordsPerMinute = 120;
                Typist typistCopy = (Typist)typist.Clone();
                typistCopy.Name = "Betty";
                typistCopy.WordsPerMinute = 115;//Not mention Role, it will copy above
                Debug.WriteLine(typist.GetDetails());
                Debug.WriteLine(typistCopy.GetDetails());
            }

            void MediatorCalling()
            {
                ConcessionsMediator mediator = new ConcessionsMediator();

                NorthConcessionStand leftKitchen = new NorthConcessionStand(mediator);
                SouthConcessionStand rightKitchen = new SouthConcessionStand(mediator);

                mediator.NorthConcessions = leftKitchen;
                mediator.SouthConcessions = rightKitchen;

                leftKitchen.Send("Can you send some popcorn?");
                rightKitchen.Send("Sure thing, Kenny's on his way.");

                rightKitchen.Send("Do you have any extra hot dogs?  We've had a rush on them over here.");
                leftKitchen.Send("Just a couple, we'll send Kenny back with them.");
            }
        }

        //public IHttpActionResult DepartmentBooks(int ID)
        //{
        //    LibraryDBEntities dbEntities = new LibraryDBEntities();
        //    List<Book> deptBooks = dbEntities.Books.Where(books => books.ID == ID).ToList();
        //    return (IHttpActionResult)View(deptBooks);
        //}

        private IHttpActionResult View(Func<IHttpActionResult> departmentBooks)
        {
            throw new NotImplementedException();
        }
    }
}
