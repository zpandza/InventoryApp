import React from 'react';

class Item extends React.Component {
    
    constructor(props){
        super(props);

    }
    render(){
        return(
            <div>
                <h1>{this.props.name}</h1>
                <h1>{this.props.description}</h1>
                <h1>{this.props.category}</h1>
                <h1>{this.props.barcode}</h1>
                <h1>{this.props.item}</h1>
            </div>
        );
    }
}

export default Item;