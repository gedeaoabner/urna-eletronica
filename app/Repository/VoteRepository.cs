using app.Data;
using app.Models;
using Microsoft.EntityFrameworkCore;

namespace app.Repository
{
    public class VoteRepository : IVoteRepository {
        private readonly UrnaContext _context;

        public VoteRepository(UrnaContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Vote>> ReadVote() {
            return await _context.Votes.ToListAsync();
        }

        public async Task<Vote> SearchVoteByCandidateId(int CandidateId) {
            var dbVotes = await _context.Votes
                .Where(x => x.CandidateId == CandidateId).FirstOrDefaultAsync();
            
            return dbVotes;
        }

        public void CreateVote(Vote vote) {
            _context.Add(vote);
        }

        public void DeleteVote(Vote vote) {
            throw new NotImplementedException();
        }


        public void UpdateVote(Vote vote) {
            throw new NotImplementedException();
        }

        public async Task<bool> SaveChangesAsync() {
            return await _context.SaveChangesAsync() > 0;
        }

        Task<Vote> IVoteRepository.SearchVoteById(int Id)
        {
            throw new NotImplementedException();
        }
    }
}