import React from 'react';
import fire from '../config/fire';
import User from './UserList/user';
import Login from '../components/Login';


class UserList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            user: null
        }
        this.authListener = this.authListener.bind(this);
    }

    authListener() {
        fire.auth().onAuthStateChanged((user) => {
            //console.log(user);
            if (user) {
                this.setState({ user });
                localStorage.setItem('user', user.uid);
            } else {
                this.setState({ user: null });
                localStorage.removeItem('user');
            }
        });
    }

    componentDidMount = () => {

        this.authListener();

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
                {
                    this.state.user ?
                        <div>
                            <div><br />
                                <h1 className="text-center">Users:</h1><br />
                                {
                                    this.state.users.map((user) => {
                                        return (
                                            <div key={user.id}>
                                                <div>
                                                    <div className="container">
                                                        <ul className="list-group">
                                                            <User id={user.id} firstname={user.firstname} lastname={user.lastname} dob={user.dob} email={user.email} />
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div> : <Login />
                }

            </div>
        );
    }
}

export default UserList;