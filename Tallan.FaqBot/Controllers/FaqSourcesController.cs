using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using Tallan.FaqBot.Models;

namespace Tallan.FaqBot.Controllers
{
    public class FaqSourcesController : ApiController
    {
        private readonly TallanFaqBotModel _db = new TallanFaqBotModel();

        // GET: api/FaqSources
        public IQueryable<FaqSource> GetFaqSources(string workspace = null)
        {
            return _db.FaqSources.Where(faq => faq.Workspace == workspace);
        }

        // GET: api/FaqSources/5
        [ResponseType(typeof(FaqSource))]
        public IHttpActionResult GetFaqSource(int id)
        {
            FaqSource faqSource = _db.FaqSources.Find(id);
            if (faqSource == null)
            {
                return NotFound();
            }

            return Ok(faqSource);
        }

        // PUT: api/FaqSources/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutFaqSource(int id, FaqSource faqSource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != faqSource.FaqSourceId)
            {
                return BadRequest();
            }

            _db.Entry(faqSource).State = EntityState.Modified;

            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FaqSourceExists(id))
                {
                    return NotFound();
                }
                throw;
            }
            
            return Ok(faqSource);
        }

        // POST: api/FaqSources
        [ResponseType(typeof(FaqSource))]
        public IHttpActionResult PostFaqSource(FaqSource faqSource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _db.FaqSources.Add(faqSource);
            _db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = faqSource.FaqSourceId }, faqSource);
        }

        // DELETE: api/FaqSources/5
        [ResponseType(typeof(FaqSource))]
        public IHttpActionResult DeleteFaqSource(int id)
        {
            FaqSource faqSource = _db.FaqSources.Find(id);
            if (faqSource == null)
            {
                return NotFound();
            }

            _db.FaqSources.Remove(faqSource);
            _db.SaveChanges();

            return Ok(faqSource);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool FaqSourceExists(int id)
        {
            return _db.FaqSources.Count(e => e.FaqSourceId == id) > 0;
        }
    }
}