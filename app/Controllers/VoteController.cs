using app.Models;
using app.Repository;
using Microsoft.AspNetCore.Mvc;

namespace app.Controllers {
    [ApiController]
    [Route("vote")]
    public class VoteController : ControllerBase {
        private readonly IVoteRepository _repository;
        private readonly ICandidateRepository _repoCandidates;

        public VoteController(IVoteRepository repository, ICandidateRepository repoCandidates)
        {
            _repository = repository;
            _repoCandidates = repoCandidates;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var votes = await _repository.ReadVote();
            return votes.Any()
                ? Ok(votes)
                : NotFound("Nothing Found");
        } 

        [HttpPost]
        public async Task<IActionResult> Post(Vote vote) {
            // validate label for null votes
            var candidate = await _repoCandidates.SearchCandidateByLabel(vote.CandidateId);
            if (candidate == null) return BadRequest("Error: Null vote not allowed!");

            _repository.CreateVote(vote);
            return await _repository.SaveChangesAsync()
                ? Ok("You voted successfully")
                : BadRequest("Error: unable to vote correctly");
        }

    }
}