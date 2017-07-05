using System.Web.Optimization;

namespace Tallan.FaqBot
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/bundles/css").Include(
                // Third party libraries
                "~/Content/bootstrap.css",
                "~/Content/font-awesome.css",
                "~/Content/simple-sidebar.css",
                // Our custom styles
                "~/Content/chat.css"));

            bundles.Add(new ScriptBundle("~/bundles/js").Include(
                // Third party libraries
                "~/Scripts/jquery-{version}.js",
                "~/Scripts/bootstrap.js",
                "~/Scripts/marked.js",
                "~/Scripts/angular.js",
                "~/Scripts/angular-ui/ui-bootstrap.js",
                "~/Scripts/angular-ui/ui-bootstrap-tpls.js",
                "~/Scripts/moment.js",
                "~/Scripts/angular-moment.js",
                "~/Scripts/scrollglue.js",
                // Our custom scripts
                "~/Scripts/faqBot/app.js",
                "~/Scripts/faqBot/filters/markdown.js",
                "~/Scripts/faqBot/services/faq.js",
                "~/Scripts/faqBot/controllers/menu.js",
                "~/Scripts/faqBot/controllers/faq.js",
                "~/Scripts/faqBot/controllers/manageSources.js"));
        }
    }
}