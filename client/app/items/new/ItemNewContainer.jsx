import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from '../../../components/Header';
import * as itemActions from '../itemActions';

class ItemNewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '', description: '' };

    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentWillMount() {
    if (this.props.item) {
      this.props.actions.clearItem();
    }
  }

  componentDidUpdate() {
    if (Object.keys(this.props.item).length > 0) {
      this.props.router.push('/items/' + this.props.item._id);
    }
  }

  onChange(event) {
    const field = event.target.name;
    this.setState({ [field]: event.target.value });
  }

  onSave(event) {
    event.preventDefault();
    const { title, description } = this.state;
    this.props.actions.createItem({ title, description });
  }

  render() {
    return (
      <Header className="newItem-page">
        <div className="container margin-top">
          <div className="col-md-8 col-md-offset-2">
            <form>
              <div className="form-group">
                <label htmlFor="titleInput">Title</label>
                <input
                  value={this.state.title}
                  onChange={this.onChange}
                  name="title"
                  id="titleInput"
                  className="form-control"
                  type="text"
                  placeholder="Add a item title..."
                />
              </div>
              <div className="form-group">
                <label htmlFor="descriptionInput">Description</label>
                <textarea
                  value={this.state.description}
                  onChange={this.onChange}
                  name="description"
                  id="descriptionInput"
                  className="form-control"
                  placeholder="Add a item description..."
                  rows="5"
                />
              </div>

              <button onClick={this.onSave} type="submit" className="btn btn-primary btn-block">
                Submit
              </button>
            </form>
          </div>
        </div>
      </Header>
    );
  }
}

const mapStateToProps = state => ({
  item: state.data.item
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(itemActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemNewContainer);
