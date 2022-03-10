import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description,imageUrl,newsUrl,author,date,source } = this.props;
        return (
            
            <div className="card my-3">
               
                <img src={imageUrl} className="card-img-top" alt="..." />
                
                <div className="card-body">
                    <h5 className="card-title">{title}...  </h5> 
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className=""><span className="badge bg-info">{source}</span></small></p>
                    <p className="card-text"><small className="text-muted">{author==null?"Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
        )
    }
}

export default NewsItem
