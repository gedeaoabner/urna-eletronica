import React from "react";

class CandidateDisplay extends React.Component {
    render() {
        const {
            fullName,
            viceFullName,
            label,
            dateTime,
            votes,
        } = this.props;
        return(
            <div className="candidate-list px-3 col-lg-6 mx-auto">
                <ul className="list-group">
                    <li className="list-group-item active" aria-current="true">Candidato: { fullName }</li>
                    <li className="list-group-item">Vice: { viceFullName }</li>
                    <li className="list-group-item">Label: { label }</li>
                    {
                        dateTime !== null && dateTime !== undefined
                        && <li className="list-group-item">{ dateTime }</li>
                    }
                    {
                        votes !== null && votes !== undefined
                        && <li className="list-group-item">{ votes || "0" }</li>
                    }
                    
                </ul>
            </div>
        );
    }
}

export default CandidateDisplay;
