import React from 'react';
import fire from '../config/fire';
import User from '../components/user';

class UserList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            users: []
        }
    }

    componentDidMount = () => {
        const usersRef = fire.database().ref('users');
        usersRef.on('value', (snapshot) => {
            let _users = snapshot.val();
            let newState = [];
            for (let user in _users) {
                newState.push({
                    id: user,
                    firstname: _users[user].firstname,
                    lastname: _users[user].lastname,
                    dob: _users[user].dob,
                    email: _users[user].email
                });
            }

            this.setState({
                users: newState
            });
        });
    }

    render() {
        return (
            <div>
                <div>
                    <h1>Users:</h1>
                    {
                        this.state.users.map((user) => {
                            return (
                                <div key={user.id}>
                                    <div>
                                        <div className="container">
                                            <ul className="list-group">
                                                <User id={user.id} firstname={user.firstname} lastname={user.lastname} dob={user.dob} email={user.email}/>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

export default UserList;