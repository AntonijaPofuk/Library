using Library.Models;
using System;
using System.Collections.Generic;
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
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Departmen/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Departmen/5
        public void Delete(int id)
        {
        }
    }
}
