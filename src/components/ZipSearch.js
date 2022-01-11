import React, {Component} from 'react';
import axios from 'axios'
import './ZipSearch.css'


class ZipSearch extends Component
{
    constructor()
    {
        super()
        this.state = this.initialState

        this.handleChange = this.handleChange.bind(this)
    }
    get initialState() {
        return {
            zipCode: "",
            stateName: "",
            cityName: "",
            population: "",

            showInfo: false,
        };
    }

    resetState() {
        this.setState(this.initialState);
    }

    handleChange(event) {
        this.setState({ zipCode: event.target.value });
    }

    componentDidUpdate() {
        if (this.state.zipCode.length !== 5) {
            if (this.state.showInfo === true)
                this.setState({showInfo: false});
        } 
        else {    
            axios.get("http://ctp-zip-api.herokuapp.com/zip/" + this.state.zipCode).then((response) => {
                const data = response.data;

                console.log(data);

                // object to hold all the new assignments from API
                const newZipSearchObj = {
                    stateName: data[0].State,
                    cityName: data[0].City,
                    population: data[0].EstimatedPopulation,
                    showInfo: true,
                };

                // changing state of variables according to API data
                this.setState(newZipSearchObj);
                console.log(this.state.population);
            }).catch((err) => console.log(err));
        }
    }

    render() {
        return (
            <>
                <div>
                </div>

                <input
                    className="zipcode_input"
                    type="text"
                    name="zipcode"
                    value={this.state.zipCode}
                    placeholder="10310"
                    onChange={this.handleChange.bind(this)}
                />

                <div className="locationInfo_container">
                    {this.state.showInfo ?
                        <div className="locationInfo">

                            <ul>
                                
                                <li>State: {this.state.stateName}</li>
                                <li>City: {this.state.cityName}</li>
                                {this.state.population ? <li>Population: {this.state.population}</li> : ""}
                            </ul>

                        </div>
                        // axios get condition was not met yet
                        : <p className="p_info">No information is being shown</p>
                    }
                </div>

            </>
        );
    }
}

export default ZipSearch