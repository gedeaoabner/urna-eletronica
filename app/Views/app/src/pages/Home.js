import React from "react";
import RegisterCandidate from "../components/RegisterCandidate";
import CandidateList from "../components/CandidateList";
import RegisterVote from "../components/RegisterVote";

class Home extends React.Component {
    constructor() {
        super();
        
        this.state = {
            page: "vote",
        }
    }

    handleChange = ({ target: { name, value } }) => {
        this.setState({
            [name]: value,
        });
    }

    render() {
        const { page } = this.state;
        return (
            <>
                <header>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                                <button
                                    className="btn-menu"
                                    name="page"
                                    onClick={ this.handleChange }
                                    value="vote"
                                >
                                    Vote
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className="btn-menu"
                                    name="page"
                                    onClick={ this.handleChange }
                                    value="registerCandidate"
                                >
                                    Register Candiate
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className="btn-menu"
                                    name="page"
                                    onClick={ this.handleChange }
                                    value="candidateList"
                                >
                                    Vote List
                                </button>
                            </li>
                        </ul>
                    </nav>
                    <h3 className="text-center">Urna Eletronica</h3>
                </header>
                <main>
                    { page === "vote" && <RegisterVote /> }
                    { page === "registerCandidate" && <RegisterCandidate /> }
                    { page === "candidateList" && <CandidateList /> }
                </main>
            </>
        );
    }
}

export default Home;