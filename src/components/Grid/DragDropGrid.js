import React from 'react';
import DraggableItem from '../Item/DraggableItem.js';
import Item from '../Item/Item';
import PropTypes from 'prop-types';

class DragDropGrid extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            currentDragIndex: -1
        };

        this.dragStarted = this.dragStarted.bind(this);
        this.itemDropped = this.itemDropped.bind(this);
        this.gridDragEnd = this.gridDragEnd.bind(this);
        this.gridDragOver = this.gridDragOver.bind(this);
    }

    // you can't access an item being dragged from the dragOver event, only the target, so lets keep track of what's being dragged
    dragStarted(dragIndex, e) {
        this.setState({ currentDragIndex: dragIndex });
    }

    gridDragEnd(e){
        e.preventDefault();
        e.dataTransfer.clearData();
    }

    gridDragOver(e){
        e.preventDefault();
    }

    itemDropped(e, dropzoneIndex){
        e.preventDefault();

        if (e.dataTransfer.files.length > 0) {
            return;
        }

        e.stopPropagation();
        
        let itemIndex = e.dataTransfer.getData("text/plain");
        this.props.onMove(itemIndex, dropzoneIndex);
    }

    render(){
        return (
            <div className="grid" 
                onDragEnd={this.gridDragEnd} 
                onDragOver={this.gridDragOver}>
                { this.props.children }
                {
                    this.props.items.map((item, index) => {
                        return (
                            <DraggableItem key={item.key} index={index} 
                                currentDragIndex={this.state.currentDragIndex}
                                dragStarted={this.dragStarted} 
                                itemDropped={this.itemDropped}>
                                <Item item={item} index={index} onChange={this.props.onChange} onDelete={this.props.onDelete} />
                            </DraggableItem>
                        );
                    })
                }
            </div>
        );
    }
}

export default DragDropGrid;

DragDropGrid.propTypes = {
    items: PropTypes.arrayOf(Object).isRequired,
    onChange: PropTypes.func.isRequired,
    onMove: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};