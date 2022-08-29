import api from "./axios";

export default {
    getVotes() {
        return api.get('/votes')
    },

    postVote(vote) {
        return api.post('/vote', vote)
            .then(response => response)
            .catch(err => err.response.data);
    }
};