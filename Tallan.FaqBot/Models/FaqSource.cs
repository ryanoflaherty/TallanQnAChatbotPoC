namespace Tallan.FaqBot.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;

    public partial class FaqSource
    {
        public int FaqSourceId { get; set; }

        [Required]
        [StringLength(250)]
        public string Name { get; set; }

        public string FaqUrl { get; set; }

        public Guid KnowledgeBase { get; set; }

        [Required]
        [StringLength(32)]
        public string SubscriptionKey { get; set; }

        public string SearchURL { get; set; }

        public int? Workspace { get; set; }

        public int? MinConfidence { get; set; }
    }
}
