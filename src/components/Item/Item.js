import React from 'react';
import UploadingItem from './UploadingItem';
import EditableItem from './EditableItem';
import PropTypes from 'prop-types';
import './Item.css';

const Item = ({item, index, onChange, onDelete}) => {
    return (item.url) 
    ? <EditableItem item={item} onDelete={onDelete} index={index} onChange={onChange} />
    : <UploadingItem file={item.file} item={item} index={index} onChange={onChange} /> ;
}

Item.propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default Item;