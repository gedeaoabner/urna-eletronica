import api from "./axios";

export default {
    getCandidates() {
        return api.get('/candidate');
    },

    getCandidateByLabel(label) {
        if (label.length > 0)
            return api.get(`/candidate/${label}`);

        return "Error: candidate not found.";
    },

    postCandidate(candidate) {
        return api.post('/candidate', candidate)
        .then(response => response)
        .catch(() => "Error: unable to register candidate. Check all informations and try agrain");
    },

    deleteCandidate(label) {
        return api.delete(`/candidate/${label}`)
        .then(response => response)
        .catch(err => err.response.data);
    }
};