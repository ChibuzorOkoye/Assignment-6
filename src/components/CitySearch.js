import React, {Component} from 'react';
import axios from 'axios'
import './CitySearch.css'


class CitySearch extends Component
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
        this.setState({ cityName: event.target.value });
    }

    componentDidUpdate() {
            if (this.state.showInfo === true)
                this.setState({showInfo: false});
        
        else {    
            axios.get("http://ctp-zip-api.herokuapp.com/city/" + this.state.cityName).then((response) => {
                const data = response.data;

                console.log(data);

                const newCitySearchObj = {
                    stateName: data[0].State,
                    cityName: data[0].City,
                    population: data[0].EstimatedPopulation,
                    showInfo: true,
                };

                this.setState(newCitySearchObj);
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
                    className="city_input"
                    type="text"
                    name="city"
                    value={this.state.cityName}
                    placeholder="Manhattan"
                    onChange={this.handleChange.bind(this)}
                />

                <div className="locationInfo_container">
                    {this.state.showInfo ?
                        <div className="locationInfo">

                            <ul>
                                <li>City: {this.state.cityName}</li>
                                <li>zipCode: {this.state.zipCode}</li>
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

export default CitySearch
