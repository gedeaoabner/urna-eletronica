import React from 'react';
import Vote from "../utils/vote";
import Candidate from "../utils/candidate";
import CandidateDisplay from "./CandidateDisplay";

class RegisterVote extends React.Component {
    constructor() {
        super();

        this.state = {
            data: [],
            candidateId: '',
            error: '',
            confirmVote: false,
            end: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    // Saves the input value into it's corresponding state
    handleChange = ({ target: { name, value } }) => {
        this.setState({
            [name]: value,
            
        });
    }

    // Show confirm button if validated
    handleConfirmVote = async (event) => {
        event.preventDefault();

        const { candidateId } = this.state;
        const candidate = await Candidate.getCandidateByLabel(candidateId);
        const actionMsg = typeof candidate === 'string' && candidate.split(' ');
        console.log(actionMsg);

        if (actionMsg[0] === 'Error:') {
            this.setState({
                error: candidate,
            })
        } else {
            this.setState({
                data: [candidate.data],
                confirmVote: true,
                error: '',
            });
        }
    }

    // Clear vote
    handleClear = (event) => {
        event.preventDefault();

        this.setState({
            data: [],
            candidateId: '',
            confirmVote: false,
        });
    }

    // Register a new vote if validated
    handleSubmit = async (event) => {
        event.preventDefault();

        const { candidateId } = this.state;
        const newCandidateId = candidateId.length > 0 ? candidateId : 0;
        const voteDate = new Date();
        const vote = {
            voteDate,
            candidateId: newCandidateId,
        }
        const action = await Vote.postVote(vote);
        const actionMsg = typeof action === 'string' && action.split(' ');
        
        this.setState({
            error: '',
            confirmVote: false,
            end: true,
        })

        if (actionMsg[0] === 'Error:') {
            this.setState({
                error: action,
            })
        }
    }

    // Restart voting functions at th end screen
    handleRestart = (event) => {
        event.preventDefault();

        this.setState({
            candidateId: '',
            end: false,
        });
    }

    render() {
        const { candidateId, error, confirmVote, data, end } = this.state;
        return (
            <>
                {/* Show vote functions */}
                {
                    end === false
                    && <section className="section-form container px-5 mx-auto">
                    <form className="register-vote">
                        <label className="form-label">
                            <span>Label: </span>
                        </label>
                        <input
                            className="form-control"
                            id="candidateId"
                            type="text"
                            name="candidateId"
                            maxLength="2"
                            placeholder="00"
                            value={ candidateId }
                            onChange={ this.handleChange }
                        />
                        { 
                            error.length > 0
                            && (
                                <>
                                <hr />
                                <span className="text-center">{ error }</span>
                                <hr />
                                </>
                            )
                        }
                        <button
                            className="btn-vote btn btn-primary form-control"
                            type="submit"
                            onClick={ this.handleConfirmVote }
                        >
                            Vote!
                        </button>

                        {/* Show candidate's card and Confirm/Clear buttons */}
                        {
                            confirmVote === true
                            && typeof data === "object"
                            && (
                                <> 
                                    <hr />
                                    <CandidateDisplay
                                        fullName={ data[0].fullName }
                                        viceFullName={ data[0].viceFullName }
                                        label={ data[0].label }
                                    />
                                    
                                    <div className="input-group mb-3">
                                        <button
                                            className="btn btn-primary form-control"
                                            type="submit"
                                            onClick={ this.handleSubmit }
                                        >
                                            Confirm!
                                        </button>
                                        <span className="input-group-text">Or</span>
                                        <button
                                            className="btn btn-primary form-control"
                                            type="submit"
                                            onClick={ this.handleClear }
                                        >
                                            Clear!
                                        </button>
                                    </div>
                                </>
                            )
                        }
                    </form>
                </section>
                }

                {/* Show end screen after voting */}
                {
                    end === true
                    && <div className="px-5">
                        <p>Vote registerd successfully!</p>
                        <button
                            className="btn btn-primary form-control"
                            type="submit"
                            onClick={ this.handleRestart }
                        >
                            Restart vote
                        </button>
                    </div>
                }
            </>
        );
    }
}

export default RegisterVote;