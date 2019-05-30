import React from 'react';

class CategoryOption extends React.Component {
    render(){
        return(
            <option>{this.props.name}</option>
        );
    }
}

export default CategoryOption;