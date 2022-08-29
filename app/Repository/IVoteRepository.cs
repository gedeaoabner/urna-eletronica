using app.Models;

namespace app.Repository
{
    public interface IVoteRepository
    {
         Task<IEnumerable<Vote>> ReadVote();
        Task<Vote> SearchVoteById(int Id);
        void CreateVote(Vote vote);
        void UpdateVote(Vote vote);
        void DeleteVote(Vote vote);

        Task<bool> SaveChangesAsync();
    }
}