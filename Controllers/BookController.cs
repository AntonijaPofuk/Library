using Library.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Http;

namespace Library.Controllers
{
    public class BookController : ApiController
    {
        private LibraryDBEntities db = new LibraryDBEntities();

        // GET: api/Book
        public IEnumerable<Book> Get()
        {
            return db.Books.AsEnumerable();
        }

        // GET: api/Book/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Book
        public void Post(Book sub)
        {
            if (ModelState.IsValid)
            {
                db.Books.Add(sub);
                db.SaveChanges();
            }
        }
        // PUT: api/Book/5
        public void Put(Book sub)
        {
            if (ModelState.IsValid)
            {
                db.Entry(sub).State = EntityState.Modified;
                try
                {
                    db.SaveChanges();
                }
                catch (Exception)
                {
                    throw;
                }
            }
        }

        // DELETE: api/Book/5
        public void Delete(int id)
        {
            Book dlt = db.Books.Find(id);
            if (dlt != null)
            {
                try
                {
                    db.Books.Remove(dlt);
                    db.SaveChanges();
                }
                catch (Exception)
                {
                    throw;
                }
            }
        }
    }
}
