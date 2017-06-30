using System.Web.Mvc;

namespace Tallan.FaqBot.Controllers
{
    public class HomeController : Controller
    {
        /// <summary>
        /// Homepage for the FAQ bot demo.
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View();
        }
    }
}