import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Anime = props => (
    <tr>
        <td>{props.anime.username}</td>
        <td>{props.anime.name}</td>
        <td>{props.anime.rating}</td>
        <td>{props.anime.date.substring(0,10)}</td>
        <td>
            {/* eslint-disable-next-line */}
            <Link to={"/edit/"+props.anime._id}>edit</Link> | <a href="#" onClick={() => { props.deleteAnime(props.anime._id) }}>delete</a>
        </td>
    </tr>
)

export default class AnimeList extends Component {
    constructor(props) {
        super(props);
        this.deleteAnime = this.deleteAnime.bind(this);

        this.state = {animes: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/animes/')
            .then(response => {
                this.setState({ animes: response.data });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteAnime(id) {
        axios.delete('http://localhost:5000/animes/'+id)
            .then(response => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })

        this.setState({ // update table after deleting
            animes: this.state.animes.filter(el => el._id !== id)
        }) // el means element, return everything except the element with the
            // id we're deleting
            // it's _id bc the id in the database is _id
    }

    animeList() {
        return this.state.animes.map(currentanime => {
            return <Anime anime={currentanime} deleteAnime={this.deleteAnime} key={currentanime._id}/>;
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Anime</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Anime</th>
                            <th>Rating</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.animeList() }
                    </tbody>
                </table>
            </div>
        )
    }
}