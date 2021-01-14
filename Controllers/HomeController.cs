using Library.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace Library.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
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
