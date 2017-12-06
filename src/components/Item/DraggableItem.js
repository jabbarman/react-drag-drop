import React from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';

class DraggableItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDragging: false,
            isDropzone: false
        }

        this.dragStart = this.dragStart.bind(this);
        this.dragEnter = this.dragEnter.bind(this);
        this.dragLeave = this.dragLeave.bind(this);
        this.dragOver = this.dragOver.bind(this);
        this.dragEnd = this.dragEnd.bind(this);
        this.drop = this.drop.bind(this);
    }

    dragStart(e){
        this.props.dragStarted(this.props.index, e);
        this.setState({ isDragging: true });
        e.dataTransfer.setData("text/plain", this.props.index.toString());
        e.dataTransfer.effectAllowed = "move";
    }

    dragEnter(e){
        e.preventDefault();
        if (this.props.currentDragIndex !== this.props.index) {
            this.setState({ isDropzone: true });
        }
    }

    dragLeave(e){
        this.setState({ isDropzone: false });
    }

    dragOver(e){
        e.preventDefault();
    }

    dragEnd(e){
        this.setState({ isDragging: false });
    }

    drop(e){
        this.setState({ isDropzone: false });
        this.props.itemDropped(e, this.props.index);
    }

    render() {
        return (
            <div className={Classnames("item", { 
                    "active-drag-item": this.state.isDragging, 
                    "active-drop-zone": this.state.isDropzone 
                })} 
                draggable="true" 
                onDragStart={this.dragStart}
                onDragEnter={this.dragEnter} 
                onDragOver={this.dragOver} 
                onDragLeave={this.dragLeave}
                onDragEnd={this.dragEnd} 
                onDrop={this.drop}>
                {this.props.children}
            </div>
        );
    }

}

export default DraggableItem;


DraggableItem.propTypes = {
    index: PropTypes.number.isRequired,
    currentDragIndex: PropTypes.number.isRequired,
    dragStarted: PropTypes.func.isRequired,
    itemDropped: PropTypes.func.isRequired
};