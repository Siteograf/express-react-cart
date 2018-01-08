import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import ReactTable from 'react-table';
import { getAllVocabulars } from './_actions/vocabularActions';
import { withRouter } from 'react-router-dom';

class VocabularList extends Component {
  componentDidMount() {
    if (_.isEmpty(this.props.userList)) {
      this.props.getAllVocabulars();
    }
  }

  columns() {
    return [
      {
        Header: 'Id',
        accessor: '_id', // String-based value accessors!
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
    ];
  }

  render() {
    return (
      <div>
        <ReactTable
          data={this.props.vocabularList}
          columns={this.columns()}
          minRows={0}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  vocabularList: state.vocabular.vocabularList,
});

const mapDispatchToProps = dispatch => ({
  getAllVocabulars: () => dispatch(getAllVocabulars()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VocabularList));
