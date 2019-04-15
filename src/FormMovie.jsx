import React, { Component } from 'react';

class FormMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: '',
          poster: '',
          comment: '',
        }
        this.onChange = this.onChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
    onChange(e) {
        this.setState({
          [e.target.name]: e.target.value,
        });
    }
    submitForm(e) {
        e.preventDefault();
        
        const url = "http://campus-bordeaux.ovh:3001/api/quests/movies/";
        const config = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        };
        fetch(url, config)
        .then(res => res.json())
        .then(res => {
            if (res.error) {
                alert(res.error);
            } else {
                alert(`Film ajouté avec l'ID ${res}!`);
            }
        }).catch(e => {
        console.error(e);
        alert('Erreur lors de l\'ajout du film !');
        });
    }

    render() {
        return (
        <div className="FormMovie">
            <h1>Saisi d'un film</h1>

            <form onSubmit={this.submitForm}>
                <fieldset>
                    <legend>Mon film préféré !</legend>
                    <div className="form-data">
                        <label htmlFor="name">Titre</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            onChange={this.onChange}
                            value={this.state.name}
                            required
                        />
                    </div>

                    <div className="form-data">
                        <label htmlFor="poster">Affiche(url)</label>
                        <input
                            type="url"
                            id="poster"
                            name="poster"
                            onChange={this.onChange}
                            value={this.state.poster}
                            required
                        />
                    </div>

                    <div className="form-data">
                        <label htmlFor="comment">Commentaire</label>
                        <textarea
                            type="text"
                            id="comment"
                            name="comment"
                            onChange={this.onChange}
                            value={this.state.comment}
                            cols='58'
                            required
                        />
                    </div>
                    <hr />
                    <div className="form-data">
                        <input type="submit" value="Envoyer" />
                    </div>
                </fieldset>
            </form>
        </div>
        );
    }

}

export default FormMovie;