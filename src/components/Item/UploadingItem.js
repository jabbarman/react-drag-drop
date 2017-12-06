import React from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import './UploadingItem.css';

class UploadingImage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            percentUploaded: 0
        };

        this.uploadProgressUpdate = this.uploadProgressUpdate.bind(this);
    }

    componentDidMount(){
        this.getUploadToken();
    }

    getUploadToken(){
        return Axios.post(process.env.REACT_APP_GET_UPLOAD_TOKEN_URL, { 
            mimeType: this.props.file.type, 
            fileSize: this.props.file.size 
        })
        .then((response) => {
            this.uploadFile(response.data.url);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    uploadFile(uploadUrl){
        Axios.put(uploadUrl, this.props.file, { 
            onUploadProgress: this.uploadProgressUpdate,
            headers: {
                'x-ms-blob-type': 'BlockBlob', 
                'x-ms-content-length': this.props.file.size, 
                'x-ms-blob-content-type': this.props.file.type, 
                'Content-Type': this.props.file.type 
            }
        })
        .then((response) => {
            let item = Object.assign({}, this.props.item);
            item.url = uploadUrl.split('?')[0];
    
            this.props.onChange(this.props.index, item);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    uploadProgressUpdate(e){
        let percent = (e.loaded / e.total) * 100;
        
        this.setState({ percentUploaded: percent });
    }

    render(){
        return (
            <div>
                <h2 className="uploading-item-title">{this.props.item.title}</h2>
                <div className="uploading-item-progress-box">
                    <div className="uploading-item-progress-bar" style={{ height: this.state.percentUploaded + '%' }}></div>
                    <span className="uploading-item-text">Uploading...</span>
                </div>
            </div>
        );
    }
}

export default UploadingImage;

UploadingImage.propTypes = {
    file: PropTypes.objectOf(File).isRequired,
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
}