namespace Tallan.FaqBot.Models
{
    using System.Data.Entity;

    public partial class TallanFaqBotModel : DbContext
    {
        public TallanFaqBotModel()
            : base("name=TallanFaqBotModel")
        {
        }

        public virtual DbSet<FaqSource> FaqSources { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
