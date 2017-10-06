
import React, {Component} from 'react';

class Active extends Component {

  //display active user count
  render() {
    return (
      <span className="usercount">
        {this.props.users} users online
      </span>
    );
  }
}
export default Active;