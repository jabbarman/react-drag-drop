import React from 'react';
import PropTypes from 'prop-types';
import './EditableItem.css';

class EditableItem extends React.Component{

    constructor(props){
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(e){
        let item = Object.assign({}, this.props.item);
        item.title = e.target.value;
        this.props.onChange(this.props.index, item);
    }

    render(){
        let {item, index, onDelete} = this.props;
        return (
            <div>
                <input type="text" value={item.title} className="edit-item-title" onChange={this.onChange} />
                <img src={item.url} alt={item.title} style={{ width: '100%' }} />
                <button onClick={() => { onDelete(index); }}>Delete</button>
            </div>
        );
    }

}

export default EditableItem;

EditableItem.propTypes = {
    item: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
};