﻿using System.Configuration;
using System.Web.Mvc;

namespace Tallan.FaqBot.Controllers
{
    public class HomeController : Controller
    {
        private readonly string clientCompanyKey = "clientCompany";

        /// <summary>
        /// Homepage for the FAQ bot demo.
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            var appSettings = ConfigurationManager.AppSettings;
            string result = appSettings[clientCompanyKey] ?? "Company Not Found";
            ViewData["ClientCompany"] = result;
            return View();
        }
    }
}