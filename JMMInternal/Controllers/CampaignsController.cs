using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using JMMInternal.Models;

namespace JMMInternal.Controllers
{
    public class CampaignsController : Controller
    {
        public IActionResult Index(string id)
        {
            return View();
        }

        public IActionResult List()
        {
            return View();
        }

        public IActionResult EditDetails(string id)
        {
            return PartialView("_EditDetails");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
