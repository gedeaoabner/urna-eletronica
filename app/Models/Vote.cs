namespace app.Models
{
    public class Vote
    {
        public int Id { get; set; }
        public int CandidateId { get; set; }
        public System.DateTime VoteDate { get; set; }
    }
}