using Library.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Library.Controllers
{
    public class DepartmenController : ApiController
    {
        //All entities
        private LibraryDBEntities db = new LibraryDBEntities();

        // GET: api/Departmen
        public IEnumerable<Departmen> Get()
        {
            return db.Departmen.AsEnumerable();
        }    

        // GET: api/Departmen/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Departmen
        public void Post(Departmen sub)
        {
            if (ModelState.IsValid)
            {
                db.Departmen.Add(sub);
                db.SaveChanges();
            }
        }

        // PUT: api/Departmen/5
        public void Put(Departmen sub)
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

        // DELETE: api/Departmen/5
        public void Delete(int id)
        {
            Departmen dlt = db.Departmen.Find(id);
            if (dlt != null)
            {
                try
                {
                    db.Departmen.Remove(dlt);
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
