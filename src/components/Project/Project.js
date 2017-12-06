import React from 'react';
import Grid from '../Grid/Grid';
import Axios from 'axios';

class Project extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            title: 'My Project',
            items: [],
            shareUrl: ''
        };

        this.onTitleChange = this.onTitleChange.bind(this);
        this.publish = this.publish.bind(this);
        this.updateItemState = this.updateItemState.bind(this);
        this.addNewItem = this.addNewItem.bind(this);
    }

    onTitleChange(e){
        this.setState({ title: e.target.value });
    }

    publish(){
        Axios.post(process.env.REACT_APP_PUBLISH_PROJECT_URL, this.state)
        .then(response => {
            if (response.data.id){
                this.setState({ shareUrl: process.env.REACT_APP_VIEW_PROJECT_URL + '/' + response.data.id});
            }
        })
        .catch(err => {
            alert(err.response.data);
        });
    }

    updateItemState(items){
        this.setState({ items: items });
    }

    addNewItem(item){
        this.setState((prevState, props) => {
            return { items: [...prevState.items, item] };
        });
    }

    render(){
        return (
            <div>
                <input type="text" value={this.state.title} className="grid-title" onChange={this.onTitleChange} placeholder="Project title" />
                <button onClick={this.publish}>Publish</button>
                <p>{this.state.shareUrl}</p>
                <Grid items={this.state.items} addItem={this.addNewItem} onChangeItems={this.updateItemState} />
            </div>
        );
    };
}

export default Project;