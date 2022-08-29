import React from 'react';
import Candidate from "../utils/candidate";

class RegisterCandidate extends React.Component {
    constructor() {
        super();

        this.state = {
            fullName: '',
            viceFullName: '',
            registerDate: '',
            label: '',
            error: '',
        }
        this.handleChange = this.handleChange.bind(this);
    }

    // Saves the input value into it's corresponding state
    handleChange = ({ target: { name, value } }) => {
        this.setState({
            [name]: value,
        });
    }

    // Register candidate if validated
    handleSubmit = async (event) => {
        event.preventDefault();
        const {
            fullName,
            viceFullName,
            label,
        } = this.state;
        const registerDate = new Date();
        const candidate = {
            fullName,
            viceFullName,
            registerDate,
            label,
        }
        const action = await Candidate.postCandidate(candidate);
        const actionMsg = typeof action === 'string' && action.split(' ');
        
        this.setState({
            error: '',
        })

        if (actionMsg[0] === 'Error:') {
            this.setState({
                error: action,
            })
        }
    }

    // Delete candidate
    handleDelete = async (event) => {
        event.preventDefault();
        const { label } = this.state;
        const action = await Candidate.deleteCandidate(label);
        console.log(action);
        const actionMsg = typeof action === 'string' && action.split(' ');
        
        this.setState({
            error: '',
        })

        if (actionMsg[0] === 'Error:') {
            this.setState({
                error: action,
            })
        }
    }

    render() {
        const { fullName, viceFullName, label, error } = this.state;
        return (
            <section className="section-form container px-5 mx-auto">
                <form className="register-candidate">
                    <label className="form-label">
                        <span>Full Name: </span>
                    </label>
                    <input
                        className="form-control"
                        id="fullName"
                        type="text"
                        name="fullName"
                        value={ fullName }
                        onChange={ this.handleChange }
                    />
                    <label className="form-label">
                        <span>Vice Full Name: </span>
                    </label>
                    <input
                        className="form-control"
                        id="viceFullName"
                        type="text"
                        name="viceFullName"
                        value={ viceFullName }
                        onChange={ this.handleChange }
                    />
                    <label className="form-label">
                        <span>Label: </span>
                    </label>
                    <input
                        className="form-control"
                        id="label"
                        type="text"
                        name="label"
                        maxLength="2"
                        placeholder="00"
                        value={ label }
                        onChange={ this.handleChange }
                    />

                    {/* Show error message if exists */}
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
                    
                    <div className="input-group mb-3">
                        <button
                            className="btn-register btn btn-primary form-control"
                            type="submit"
                            onClick={ this.handleSubmit }
                        >
                            Register
                        </button>
                        <span className="input-group-text">Or</span>
                        <button
                            className="btn-delete btn btn-primary form-control"
                            type="submit"
                            onClick={ this.handleDelete }
                        >
                            Delete
                        </button>
                    </div>
                </form>
            </section>
        );
    }
}

export default RegisterCandidate;