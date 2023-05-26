import React from 'react'

const Newsitem=(props)=>{

    let { title, description, imageUrl, newsUrl, author, date } = props;
    return (
      <div>
        <div className="card">
          <img src={!imageUrl ? "https://www.livemint.com/lm-img/img/2023/05/18/600x338/asus_gaming_laptops_1684382334219_1684382342976.webp"
            : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {!author ? "unknown" : author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }

export default Newsitem
