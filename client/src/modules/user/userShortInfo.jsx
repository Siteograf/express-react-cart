import React, { Component } from 'react';
import { connect } from 'react-redux';

class UseShortInfo extends Component {
  render() {
    return (
      <div>
        {this.props.userInfo && this.props.userInfo.email}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.user.userInfo,
});

const mapDispatchToProps = dispatch => ({
  // getUserById: userId => dispatch(getUserById(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UseShortInfo);
