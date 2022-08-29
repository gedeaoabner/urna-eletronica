import React from "react";
import CandidateDisplay from "./CandidateDisplay";
import Candidate from "../utils/candidate";

class CandidateList extends React.Component {
    constructor() {
        super()
        this.state = {
            data: [],
        }
    }

    // Get all candidates when the page is loaded
    componentDidMount() {
        Candidate.getCandidates()
            .then(response => {
                // Orders list according to the amount of votes
                const data = response.data.sort((a, b) => b.votes - a.votes);
                this.setState({
                    data,
                });
            });
    }

    render() {
        const { data } = this.state;
        
        return (
            <section className="container-lg row-12">
                {/* Shows message when the list is empty */}
                { data.length === 0 && <p>No candidate was found.</p> }

                {/* Show each item of the list only when it's not empty */}
                {
                    data.length > 0 && data.map((candidate, index) => {
                        const {
                            fullName,
                            viceFullName,
                            label,
                            registerDate,
                            votes,
                        } = candidate;
                        
                        return (
                            <CandidateDisplay
                                key={ index }
                                fullName={ fullName }
                                viceFullName={ viceFullName }
                                label={ label }
                                dateTime={ registerDate }
                                votes={ votes }
                            />
                        )
                    })
                }
            </section>
        );
    }
}

export default CandidateList;
