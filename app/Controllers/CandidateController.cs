using app.Models;
using app.Repository;
using Microsoft.AspNetCore.Mvc;

namespace app.Controllers
{
    [ApiController]
    [Route("candidate")]
    [Route("votes")]
    public class CandidateController : ControllerBase
    {
        private readonly ICandidateRepository _repository;
        private readonly IVoteRepository _repVote; 
        public CandidateController(ICandidateRepository repository, IVoteRepository repVote)
        {
            _repository = repository;
            _repVote = repVote;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var candidates = await _repository.ReadCandidate();
            var votes = await _repVote.ReadVote();
            foreach (var candidate in candidates) {
                int? count = 0;
                candidate.Votes = count;
                foreach (var vote in votes) {
                    if (vote.CandidateId == candidate.Label) {
                        count = count + 1;
                    }
                    candidate.Votes = count;
                }
                count = 0;
            }
            
            return candidates.Any()
                ? Ok(candidates)
                : NotFound("Nothing Found");
        }

        [HttpGet("{Label}")]
        public async Task<IActionResult> GetById(Int32? Label)
        {
            var candidates = await _repository.SearchCandidateByLabel(Label);
            return candidates != null
                ? Ok(candidates)
                : NotFound("Candidate not found");
        }

        [HttpPost]
        public async Task<IActionResult> Post(Candidate candidate)
        {
            // validate label
            if (candidate.Label.ToString() == "" | candidate.Label == null) return BadRequest("Error: Invalid label");
            var candidates = await _repository.SearchCandidateByLabel(candidate.Label);
            if (candidates != null) return BadRequest("Error: Candidate's label already used! Pick a new one");

            _repository.CreateCandidate(candidate);
            return await _repository.SaveChangesAsync()
                ? Ok("Candidate was created successfully")
                : BadRequest("Error: Candidate was not created");
        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> Put(int Id, Candidate candidate)
        {
            var dbCandidate = await _repository.SearchCandidateById(Id);
            if (dbCandidate == null) return NotFound("Candidate not found");

            dbCandidate.FullName = candidate.FullName ?? dbCandidate.FullName;
            dbCandidate.ViceFullName = candidate.ViceFullName ?? dbCandidate.ViceFullName;
            dbCandidate.Label = candidate.Label ?? dbCandidate.Label;
            _repository.UpdateCandidate(dbCandidate);

            return await _repository.SaveChangesAsync()
                ? Ok("Candidate was updated successfully!")
                : BadRequest("Error: update failed!");
        }

        [HttpDelete("{Label}")]
        public async Task<IActionResult> Delete(int Label)
        {
            var dbCandidate = await _repository.SearchCandidateByLabel(Label);
            if (dbCandidate == null) return NotFound("Error: Candidate not found");

            _repository.DeleteCandidate(dbCandidate);

            return await _repository.SaveChangesAsync()
                ? Ok("Candidate was deleted successfully!")
                : BadRequest("Error: deletion failed!");
        }
    }
}