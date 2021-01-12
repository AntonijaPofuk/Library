using Library.Models;
using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Library.Controllers
{
    public class DepartmentController : ApiController
    {

        public HttpResponseMessage Get()
        {
            { //Add stored procedures
                string query = @"
                SELECT * FROM dbo.Departmens";
                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["LibraryDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return Request.CreateResponse(HttpStatusCode.OK, table);
            }
        }

        public string Post(Department dep)
        {
            try
            {
                string query = @"
                INSERT INTO dbo.Departmens(Name, City) VALUES ('" + dep.Name + "','" + dep.City + @"')";
                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["LibraryDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return "Added new row successfully";
            }
            catch (Exception)
            {

                return "Failed to add new row!";
            }
        }

        public string Put(Department dep)
        {
            try
            {
                string query = "UPDATE dbo.Departmens SET Name='" + dep.Name+"', City='"+dep.City+"' WHERE ID="+ dep.ID;
                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["LibraryDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return "Updated new row successfully";
            }
            catch (Exception)
            {

                return "Failed to update new row!";
            }
        }

        public string Delete(int ID)
        {
            try
            {
                string query = "DELETE FROM Departmens WHERE ID=" + ID;
                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["LibraryDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return "Deleted row successfully";
            }
            catch (Exception)
            {

                return "Failed to delete  row!";
            }
        }
    }
}
