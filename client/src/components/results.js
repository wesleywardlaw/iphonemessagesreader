import _ from 'lodash';
import React, { Component } from 'react';

class Results extends Component{
    constructor(props){
        super(props);
        this.state = {count:50, rendered:false};
    }
    renderResults(){
        return _.map(this.props.results, (result, index) =>{
            if(index<this.state.count){
                if(result.Type==="received"){
                    if(result.AttachmentID!==null&&(
                        result.AttachmentID.toLowerCase().includes('.jpg')||
                        result.AttachmentID.toLowerCase().includes('.png')||
                        result.AttachmentID.toLowerCase().includes('.jpeg')||
                        result.AttachmentID.toLowerCase().includes('.gif'))){
                        const imgString =`../../attachments/${result.AttachmentID}`
                        return(
                            <div key={index}>
                                <li>{result.Time}</li>
                                <li className="left tri-right border round btm-left-in"><img src={imgString} width="100%" /></li>
                            </div>
                        );
                    }
                    return(
                            <div key={index}>
                                <li>{result.Time}</li>
                                <li className="left tri-right border round btm-left-in">{result.Text}</li>
                            </div>
                    );
                }else{
                    if(result.AttachmentID!==null&&(
                        result.AttachmentID.toLowerCase().includes('.jpg')||
                        result.AttachmentID.toLowerCase().includes('.png')||
                        result.AttachmentID.toLowerCase().includes('.jpeg')||
                        result.AttachmentID.toLowerCase().includes('.gif'))){
                        const imgString =`../../attachments/${result.AttachmentID}`
                        return(
                            <div key={index}>
                                <li className="time">{result.Time}</li>
                                <li className="right tri-right border btm-right-in"><img src={imgString} width="100%" /></li>
                            </div>
                        );
                    }
                    return(
                            <div key={index}>
                                <li className="time">{result.Time}</li>
                                <li className="right tri-right border btm-right-in">{result.Text}</li>
                            </div>
                    );
                }
            }       
        });
    }

    renderButton(){
        if(this.props.rendered){
            return(
                <button className="btn btn-right" onClick={()=>{this.setState({count:this.state.count+50})}}>Next</button>  
            );
        }
    }
    
    render(){
        return(
            <div>
                {this.renderResults()}
                {this.renderButton()}
            </div>
        );
    }
}

export default Results;