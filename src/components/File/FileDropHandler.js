import React from 'react';
import PropTypes from 'prop-types';
import * as FileTypes from './SupportedFileTypes';
import * as Item from './ItemFactory';

class FileDropHandler extends React.Component {

    constructor(props){
        super(props);

        this.fileDropped = this.fileDropped.bind(this);
    }

    fileDropped(e){
        e.preventDefault();
        
        for (let i = 0; i < e.dataTransfer.files.length; i++) {
            let file = e.dataTransfer.files.item(i);
            
            if (FileTypes.isValidFile(file.type)) {
                this.props.onNewFile( Item.newItem(file) );
            } else {
                console.log("invalid type");
            }
        }        
        
    }

    render(){
        return (
            <div className="file-drop-handler" onDrop={this.fileDropped}>
                {this.props.children}
            </div>
        );
    }

}

export default FileDropHandler;

FileDropHandler.propTypes = {
    onNewFile: PropTypes.func.isRequired
};