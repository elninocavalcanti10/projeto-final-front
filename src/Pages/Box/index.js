import React, { Component } from 'react';
import logo from '../../assets/logo-web-two.png';

import { distanceInWords } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Dropzone from 'react-dropzone'

import api from '../../services/api';
import "./styles.css";

export default class Box extends Component {
    state = {
        box: {}
    }

    async componentDidMount() {
        const box = this.props.match.params.id;
        const response = await api.get(`boxes/${box}`);
        
        this.setState({ box: response.data });
    }

    handleUpload = (files) => {
        files.forEach(file => {
            const data = new FormData();
            const box = this.props.match.params.id;
            data.append('file', file);
            api.post(`boxes/${box}/files`, data);
        });
    };

    render() {
        return (
            <div id="box-container">
                <header>
                    <img className="logo" src={logo} alt="" />
                    <h1>{this.state.box.title}</h1>
                </header>

                <Dropzone onDropAccepted={this.handleUpload}>
                    {({ getRootProps, getInputProps }) => (
                        <div className="upload" {... getRootProps()}>
                            <input {... getRootProps()} />
                            <p>Arraste vídeos ou clique</p>
                        </div>
                    )}
                </Dropzone>

                <ul>
                    { this.state.box.files && this.state.box.files.map(file => (

                    <li key={file._id}>
                    <a className="fileInfo" href={file.url}>
                        <strong>{file.title}</strong>
                    </a>
                    <span>Há{" "}{distanceInWords(file.createdAt, new Date(), {
                        locale: pt
                    })}</span>
                    </li>

                    )) }
                </ul>
            </div>
        );
    }
}