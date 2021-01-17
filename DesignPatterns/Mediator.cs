using System;
using System.Diagnostics;

namespace CRUDWebApp.DesignPatterns
{
    interface IMediator //Defines communication protocol
    {
        void SendMessage(string message, ConcessionStand concessionStand);
    }

    /// <summary>
    /// The Concrete Mediator class
    /// </summary>
    class ConcessionsMediator : IMediator    {
        private NorthConcessionStand _northConcessions; //Stores all involved entities ->add getter and setter
        private SouthConcessionStand _southConcessions;
        public NorthConcessionStand NorthConcessions
        {
            set { _northConcessions = value; }
        }

        public SouthConcessionStand SouthConcessions
        {
            set { _southConcessions = value; }
        }    

        public void SendMessage(string message, ConcessionStand colleague)
        {
            if (colleague == _northConcessions)
            {
                _southConcessions.Notify(message);
            }
            else
            {
                _northConcessions.Notify(message);
            }
        }
    }

    /// <summary>
    /// The Colleague abstract class, representing an entity involved in the conversation which should receive messages.
    /// </summary>
    abstract class ConcessionStand
    {
        protected IMediator mediator; //Implements mediator and Stand

        public ConcessionStand(IMediator mediator)
        {
            this.mediator = mediator;
        }
    }

    /// <summary>
    /// A Concrete Colleague class
    /// </summary>
    class NorthConcessionStand : ConcessionStand
    {        // Mediator is passed as argument in constructor
        public NorthConcessionStand(IMediator mediator) : base(mediator)
        {
        }
        public void Send(string message)
        {
            Debug.WriteLine("North Stand sends message: " + message);
            mediator.SendMessage(message, this);
        }

        public void Notify(string message)
        {
            Debug.WriteLine("North Stand gets message: " + message);
        }
    }

    /// <summary>
    /// A Concrete Colleague class
    /// </summary>
    class SouthConcessionStand : ConcessionStand
    {        // Mediator is passed as argument in constructor
        public SouthConcessionStand(IMediator mediator) : base(mediator)
        {
        }

        public void Send(string message)
        {
            Debug.WriteLine("South Stand sends message: " + message);
            mediator.SendMessage(message, this);
        }

        public void Notify(string message)
        {
            Debug.WriteLine("South Stand gets message: " + message);
        }
    }
}
