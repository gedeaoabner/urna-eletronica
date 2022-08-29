using app.Data;
using app.Models;
using Microsoft.EntityFrameworkCore;

namespace app.Repository
{
    public class CandidateRepository : ICandidateRepository
    {
        private readonly UrnaContext _context;

        public CandidateRepository(UrnaContext context)
        {
            _context = context;
        }
        
        // Get all candidates
        public async Task<IEnumerable<Candidate>> ReadCandidate()
        {
            return await _context.Candidates.ToListAsync();
        }

        // Get a candidate by Id
        public async Task<Candidate> SearchCandidateById(int Id) {
            var dbCandidate = await _context.Candidates
                .Where(x => x.Id == Id).FirstOrDefaultAsync();
            
            return dbCandidate;
        }

        // Get a candidate by Label
        public async Task<Candidate> SearchCandidateByLabel(int? Label) {
            var dbCandidate = await _context.Candidates
                .Where(x => x.Label == Label).FirstOrDefaultAsync();
            
            return dbCandidate;
        }

        // Add a new candidate
        public void CreateCandidate(Candidate candidate) {
           _context.Add(candidate);
        }

        // Delete a candidate
        public void DeleteCandidate(Candidate candidate) {
            _context.Remove(candidate);
        }

        // Update a existing candidate
        public void UpdateCandidate(Candidate candidate) {
            _context.Update(candidate);
        }

        // Interface implementation
        public async Task<bool> SaveChangesAsync() {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}