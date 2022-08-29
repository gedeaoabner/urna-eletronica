namespace app.Models
{
    public class Candidate
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string ViceFullName { get; set; }
        public DateTime? RegisterDate { get; set; }
        public Int32? Label { get; set; }
        public int? Votes { get; set; }
    }
}