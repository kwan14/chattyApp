
import React, {Component} from 'react';

class Active extends Component {

  render() {
    return (
      <span className="usercount">
        {this.props.users} users online
      </span>
    );
  }
}
export default Active;