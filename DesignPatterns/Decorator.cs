namespace CRUDWebApp.DesignPatterns.Decorator
{
    public interface IPizza {
        string getPizzaType();
    }

    public class Pizza : IPizza
    {
        public string getPizzaType()
        {
            return "This is normal pizza ";
        }
    }

     public class PizzaDecorator : IPizza
    {

        public IPizza _pizza;

        public PizzaDecorator(IPizza pizza)
        {
            _pizza = pizza;
        }
        public virtual string getPizzaType()
        {
            return _pizza.getPizzaType();
        }
    }

   public class CheeseDecorator : PizzaDecorator
    {
        public CheeseDecorator(IPizza pizza) : base(pizza)
        { }
            public override string getPizzaType()
        {
            string type = base.getPizzaType();
            type += "\r\n with extra cheese ";
            return type;
        }
    }

    public class OnionDecorator : PizzaDecorator
    {
        public OnionDecorator(IPizza pizza) : base(pizza)
        { }
        public override string getPizzaType()
        {
            string type = base.getPizzaType();
            type += "\r\n and with extra onion ";
            return type;
        }
    }

    public class TomatoDecorator : PizzaDecorator
    {
        public TomatoDecorator(IPizza pizza) : base(pizza)
        { }
        public override string getPizzaType()
        {
            string type = base.getPizzaType();
            type += "\r\n and with extra tomato!";
            return type;
        }
    }
}

