import React, { Component } from 'react';
import fire from '../config/fire';
import Item from '../components/item';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { Button, ItemDescription, Table, Menu, Icon } from 'semantic-ui-react'
import Firebase from 'firebase';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            itemsRef: fire.database().ref("items"),
            items: [],
            name: "",
            description: "",
            category: "",
            barcode: ""
        }

        this.logout = this.logout.bind(this);
    }

    componentDidMount = () => {
        const itemsRef = fire.database().ref('items');
        itemsRef.on('value', (snapshot) => {
            let _items = snapshot.val();
            let newState = [];
            for (let item in _items) {
                newState.push({
                    id: item,
                    name: _items[item].name,
                    description: _items[item].description,
                    category: _items[item].category,
                    barcode: _items[item].barcode
                });
            }

            this.setState({
                items: newState
            });
        });
    }

    logout() {
        fire.auth().signOut();
    }

    render() {

        return (
            <div>
                {/* <div>
                    <div><br />
                        <h1>Items: </h1><br />
                        {
                            this.state.items.map((item) => {
                                return (
                                    <div key={item.id}>
                                        <div>
                                            <div className="container">
                                                <ul className="list-group">
                                                    <Item id={item.id} name={item.name} description={item.description} category={item.category} barcode={item.barcode} />
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>

                    <br />
                    <button className="ui primary button"><Link to="/NewItem" style={{ color: "white" }}>Add Item</Link></button><br /><br />
                    <button onClick={this.logout} className="btn btn-danger">Logout</button>
                </div> */}
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Header</Table.HeaderCell>
                            <Table.HeaderCell>Header</Table.HeaderCell>
                            <Table.HeaderCell>Header</Table.HeaderCell>
                            <Table.HeaderCell>Header</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            this.state.items.map((item) => {
                                return (
                                    //<Item key={item.id} id={item.id} name={item.name} description={item.description} category={item.category} barcode={item.barcode} />
                                    <Table.Row>
                                        <Table.Cell>{item.name}</Table.Cell>
                                        <Table.Cell>{item.description}</Table.Cell>
                                        <Table.Cell>Test</Table.Cell>
                                        <Table.Cell>Test</Table.Cell>
                                    </Table.Row >
                                );
                            })
                        }
                    </Table.Body>
                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan='4'>
                                <Menu floated='right' pagination>
                                    <Menu.Item as='a' icon>
                                        <Icon name='chevron left' />
                                    </Menu.Item>
                                    <Menu.Item as='a'>1</Menu.Item>
                                    <Menu.Item as='a'>2</Menu.Item>
                                    <Menu.Item as='a'>3</Menu.Item>
                                    <Menu.Item as='a'>4</Menu.Item>
                                    <Menu.Item as='a' icon>
                                        <Icon name='chevron right' />
                                    </Menu.Item>
                                </Menu>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
                {/* <table className="ui celled table">
                    <thead className="">
                        <tr className="">
                            <th className="">Name</th>
                            <th className="">Description</th>
                            <th className="">Edit</th>
                            <th className="">Delete</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        <tr>
                            <td>TEST</td>
                            <td>TEST</td>
                            <td>TEST</td>
                            <td>TEST</td>
                        </tr>
                        {
                            this.state.items.map((item) => {
                                return (
                                    <tr className="">
                                        <Item key={item.id} id={item.id} name={item.name} description={item.description} category={item.category} barcode={item.barcode} />
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                    <tfoot className="">
                        <tr className="">
                            <th colSpan="4" className="">
                                <div className="ui pagination right floated menu">
                                    <a className="icon item"
                                    ><i aria-hidden="true" className="chevron left icon"></i></a
                                    ><a className="item">1</a><a className="item">2</a><a className="item">3</a
                                    ><a className="item">4</a
                                    ><a className="icon item"
                                    ><i aria-hidden="true" className="chevron right icon"></i
                                    ></a>
                                </div>
                            </th>
                        </tr>
                    </tfoot>
                </table> */}
            </div>
        );

    }

}

export default Home;