import React, { Component } from 'react';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { term: '', date: '20000101' };
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="form-group">
                        <input id="search"
                            className="form-control"
                            type="text"
                            placeholder="Enter ten digit phone number of text recipient"
                            onChange={event => this.onTermChange(event.target.value)}
                        />
                        <input id="date"
                            className="form-control"
                            type="text"
                            placeholder="Enter a date in YYYYMMDD form, ex: 20171016"
                            onChange={event => this.onDateChange(event.target.value)}
                        />
                        <button id="form-submit" className="btn btn-primary" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        );
    }

    onTermChange(term) {
        this.setState({ term });
    }

    onDateChange(date) {
        if(date===''){
            date=20000101;
        }
        this.setState({ date });
    }

    onSubmit(event) {
        this.props.onSearchTermChange(this.state.term, this.state.date);
        event.preventDefault();
    }
}

export default Search;