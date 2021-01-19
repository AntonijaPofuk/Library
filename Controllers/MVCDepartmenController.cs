using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Library.Models;
using Library.ViewModels;

namespace Library.Controllers
{
    public class MVCDepartmenController : Controller
    {
        private LibraryDBEntities db = new LibraryDBEntities();
     
        // GET: MVCDepartmen
        public ActionResult Index(int? deptID)
        {
            var viewModel = new DepartmentViewModel();
            viewModel.Departments = db.Departmens.Include("Books").OrderBy(d=>d.ID);
            viewModel.Books = db.Books.OrderBy(d => d.ID);
            if (deptID != null)
            {
                ViewBag.ID = deptID.Value;
                viewModel.Books = viewModel.Departments.Where(
                    x => x.ID == deptID).Single().Books;
            }
            var departmens = db.Departmens;           
            return View(viewModel);
        }

        // GET: MVCDepartmen/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Departmen departmen = db.Departmens.Find(id);
            if (departmen == null)
            {
                return HttpNotFound();
            }
            return View(departmen);
        }

        // GET: MVCDepartmen/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: MVCDepartmen/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID,Name,City")] Departmen departmen)
        {
            if (ModelState.IsValid)
            {
                db.Departmens.Add(departmen);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(departmen);
        }

        // GET: MVCDepartmen/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Departmen departmen = db.Departmens.Find(id);
            if (departmen == null)
            {
                return HttpNotFound();
            }
            return View(departmen);
        }

        // POST: MVCDepartmen/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,Name,City")] Departmen departmen)
        {
            if (ModelState.IsValid)
            {
                db.Entry(departmen).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(departmen);
        }

        // GET: MVCDepartmen/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Departmen departmen = db.Departmens.Find(id);
            if (departmen == null)
            {
                return HttpNotFound();
            }
            return View(departmen);
        }

        // POST: MVCDepartmen/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Departmen departmen = db.Departmens.Find(id);
            db.Departmens.Remove(departmen);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
