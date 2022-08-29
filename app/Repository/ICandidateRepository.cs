using app.Models;

namespace app.Repository
{
    public interface ICandidateRepository
    {
        Task<IEnumerable<Candidate>> ReadCandidate();
        Task<Candidate> SearchCandidateById(int Id);
        Task<Candidate> SearchCandidateByLabel(int? Label);
        void CreateCandidate(Candidate candidate);
        void UpdateCandidate(Candidate candidate);
        void DeleteCandidate(Candidate candidate);

        Task<bool> SaveChangesAsync();
    }
}