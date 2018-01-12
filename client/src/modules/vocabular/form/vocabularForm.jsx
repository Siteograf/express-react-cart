import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Button, Col, Form, Row } from 'reactstrap';
import VocabularTree from './vocabularTree';
import VocabularTermForm from './vocabularTermForm';
import { required } from './../../form/validators';
import { TextField } from './../../form/form';
import { vocabularCreate, vocabularUpdate, getVocabularById } from '../_actions/vocabularActions';

class VocabularEditForm extends Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
  }

  formSubmit(e) {
    e.preventDefault();

    const vocabularId = this.props.match.params.id;
    const data = {
      name: this.props.vocabularForm.values.name,
      terms: this.props.vocabularTree,
    };

    if (vocabularId) {
      this.props.vocabularUpdate(vocabularId, data);
    } else {
      this.props.vocabularCreate(data);
    }
  }

  componentDidMount() {
    const vocabularId = this.props.match.params.id;

    if (vocabularId) {
      this.props.getVocabularById(vocabularId);
    }
  }


  render() {
    return (
      <Row>
        <Col md="12">
          <h5>Vocabular Edit</h5>

          <Form onSubmit={this.formSubmit}>
            <Field
              name="name"
              type="text"
              placeholder="Vocabular name"
              component={TextField}
              validate={[required]}
            />

            <Button
              type="submit"
              color="primary"
              disabled={this.props.vocabularForm && {}.hasOwnProperty.call(this.props.vocabularForm, 'syncErrors')}
            >Save
            </Button>
          </Form>
        </Col>

        <Col md="6">
          <VocabularTree />
        </Col>

        <Col md="6">
          <VocabularTermForm />
        </Col>
      </Row>
    );
  }
}


const mapStateToProps = state => ({
  vocabularForm: state.form.vocabular,
  vocabularTree: state.vocabular.vocabularTree,
});

const mapDispatchToProps = dispatch => ({
  getVocabularById: vocabularId => dispatch(getVocabularById(vocabularId)),
  vocabularCreate: vocabular => dispatch(vocabularCreate(vocabular)),
  vocabularUpdate: (vocabularId, data) => dispatch(vocabularUpdate(vocabularId, data)),
});


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: 'vocabular' }),
)(VocabularEditForm);
