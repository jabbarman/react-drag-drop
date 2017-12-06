import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

class Viewer extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            project: null,
            currentItemIndex: this.props.match.params.itemIndex || 0
        };
    }

    componentDidMount(){
        Axios.get(process.env.REACT_APP_GET_PROJECT_URL + "&id=" + this.props.match.params.id)
        .then(response => {
            let p = (typeof response.data === 'string') ? JSON.parse(response.data) : response.data;

            this.setState({ project: p });
        })
        .catch(err => {
            console.log(err);
        });
        
    }

    componentWillReceiveProps(nextProps){
        var next = nextProps.match.params.itemIndex;

        if (next < 0) next = this.state.project.items.length - 1;
        if (next > (this.state.project.items.length - 1)) next = 0;

        this.setState({ currentItemIndex: next });
    }

    nextPageLink(){
        let next = parseInt(this.state.currentItemIndex, 10) + 1;
        if (next >= this.state.project.items.length) next = 0;

        return `/view/${this.props.match.params.id}/${next}`;
    }

    prevPageLink(){
        let next = parseInt(this.state.currentItemIndex, 10) - 1;
        if (next < 0) next = this.state.project.items.length - 1;

        return `/view/${this.props.match.params.id}/${next}`;
    }

    render(){
        if (!this.state.project) {
            return <h1>Loading...</h1>;
        }
        return (
            <div className="viewer">
                <h1>{this.state.project.title}</h1>
                <nav>
                    <Link to={this.prevPageLink()}>Prev</Link> <Link to={this.nextPageLink()}>Next</Link>
                </nav>
                <h2>{this.state.project.items[this.state.currentItemIndex].title}</h2>
                <img src={this.state.project.items[this.state.currentItemIndex].url} alt="" />
            </div>
        );
    }
}

export default Viewer;