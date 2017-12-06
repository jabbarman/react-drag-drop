import React from 'react';
import PropTypes from 'prop-types';
import DragDropGrid from './DragDropGrid';
import FileDropHandler from '../File/FileDropHandler';
import './Grid.css';

class Grid extends React.Component {

    constructor(props){
        super(props);

        this.updateItem = this.updateItem.bind(this);
        this.moveItem = this.moveItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    updateItem(itemIndex, item){
        let items = [...this.props.items];
        items.splice(itemIndex, 1, item);
        this.props.onChangeItems(items);
    }

    moveItem(currentIndex, newIndex){
        let items = [...this.props.items];
        let item = items.splice(currentIndex, 1);

        items.splice(newIndex, 0, item[0]);

        this.props.onChangeItems(items);
    }

    deleteItem(itemIndex){
        let items = [...this.props.items];
        items.splice(itemIndex, 1);
        this.props.onChangeItems(items);
    }

    render(){
        return (
            <FileDropHandler onNewFile={this.props.addItem}>
                <DragDropGrid items={this.props.items} onChange={this.updateItem} onMove={this.moveItem} onDelete={this.deleteItem}>
                    { this.props.items.length === 0 && <h2>Drop files here</h2> }
                </DragDropGrid>
            </FileDropHandler>
        );
    }
}

export default Grid;

Grid.propTypes = {
    items: PropTypes.array.isRequired,
    addItem: PropTypes.func.isRequired, 
    onChangeItems: PropTypes.func.isRequired
};