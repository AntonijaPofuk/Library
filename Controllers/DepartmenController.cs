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
            return db.Departmens.AsEnumerable();
        }    

        // GET: api/Departmen/id
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Departmen
        public void Post(Departmen sub)
        {
            if (ModelState.IsValid)
            {
                db.Departmens.Add(sub);
                db.SaveChanges();
            }
        }

        // PUT: api/Departmen/id
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

        // DELETE: api/Departmen/id
        public void Delete(int id)
        {
            Departmen dlt = db.Departmens.Find(id);
            if (dlt != null)
            {
                try
                {
                    db.Departmens.Remove(dlt);
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
