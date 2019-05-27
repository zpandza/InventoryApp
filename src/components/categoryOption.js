import React from 'react';

class CategoryOption extends React.Component {
    render(){
        return(
            <option>{`${this.props.id} - ${this.props.name} - ${this.props.description}`}</option>
        );
    }
}

export default CategoryOption;