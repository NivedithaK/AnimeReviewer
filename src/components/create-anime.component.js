import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateAnime extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeRating = this.onChangeRating.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            name: '',
            rating: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        // Runs right before anything appears on page
        axios.get("http://localhost:5000/users")
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username //default appears as first user in list
                    })
                }
            })
    }

    onChangeUsername(e) {
        this.setState( {
            username: e.target.value
        })
    }

    onChangeName(e) {
        this.setState( {
            name: e.target.value
        })
    }

    onChangeRating(e) {
        this.setState( {
            rating: e.target.value
        })
    }

    onChangeDate(date) {
        this.setState( {
            date: date
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const anime = {
            username: this.state.username,
            name: this.state.name,
            rating: this.state.rating,
            date: this.state.date
        }
        console.log(anime);

        axios.post('http://localhost:5000/animes/add', anime)
        .then(res => console.log(res.data));

        window.location = '/';
        // Return to homepage
    }

    render() {
        return (
            <div>
                <h3>Create New Anime Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                                {
                                    this.state.users.map(function(user) {
                                        return <option  
                                            key={user}
                                            value={user}>{user}
                                            </option>;
                                    })
                                }
                            </select>
                    </div>

                    <div className="form-group">
                        <label>Anime: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName}
                            />
                    </div>

                    <div className="form-group">
                        <label>Rating (out of 10): </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.rating}
                            onChange={this.onChangeRating}
                            />
                    </div>


                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Anime Log" className="btn btn-primary"/>
                    </div>

                </form>
            </div>
        )
    }
}