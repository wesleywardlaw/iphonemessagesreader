import React, { Component } from 'react';
import Search from './search';
import Results from './results';
import axios from 'axios';

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            results: '',
            rendered:false
        }
    }

    messageSearch(term, date){
        const ROOT_URL = "http://localhost:3090";        
        let newTerm = term.replace(/([,.+-\s])/g, '');
        newTerm = '+1' + newTerm;
        const id=newTerm;
        
        axios.get(`${ROOT_URL}/messages/${id}/${date}`)
            .then(response => {
                const messages = JSON.parse(response.data.messages);
                const attachments = JSON.parse(response.data.attachments);
                attachments.map(attachment =>{
                    attachment.filename = attachment.filename.replace(/(.*)\//, '');
                    return attachment;
                });

                const arrayToObject = (array, keyField) =>
                array.reduce((obj, item) => {
                  obj[item[keyField]] = item
                  return obj
                }, {});

                const attachmentObject = arrayToObject(attachments, "ROWID");
                messages.map(message =>{
                    if(message.AttachmentID!==null){
                        message.AttachmentID=attachmentObject[message.AttachmentID].filename;
                    }
                    return message;
                })
                this.setState({results:messages, rendered:true})
            })
    }

    render() {
        return (
            <div>
                <h1>iPhone Text Message Viewer</h1>
                <Search onSearchTermChange = {this.messageSearch.bind(this)} />
                <Results results={this.state.results} rendered={this.state.rendered} />
            </div>
        );
    }
}
