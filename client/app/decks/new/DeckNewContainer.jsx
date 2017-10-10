import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../../../components/Header';
import * as deckActions from '../deckActions';
import EditItemCard from '../edit/EditItemCard';

class DeckNewContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { title: '', description: '', items: [{ title: '', description: '' }] };
    this.onAddCard = this.onAddCard.bind(this);
    this.onRemoveCard = this.onRemoveCard.bind(this);
    this.onCreateDeck = this.onCreateDeck.bind(this);
    this.onItemInputChange = this.onItemInputChange.bind(this);
    this.onDeckInputChange = this.onDeckInputChange.bind(this);
  }

  componentWillMount() {
    if (this.props.deck) {
      this.props.actions.clearDeck();
    }
  }

  componentDidUpdate() {
    if (Object.keys(this.props.deck).length > 0) {
      this.props.router.push(`/decks/` + this.props.deck._id);
    }
  }

  onAddCard() {
    const { items } = this.state;
    this.setState(() => ({ items: [...items, { title: '', description: '' }] }));
  }
  onRemoveCard(index) {
    const { items } = this.state;
    items.splice(index, 1);
    this.setState(() => ({ items: items }));
  }
  onItemInputChange(e, key) {
    const { items } = this.state;
    items[key] = { ...items[key], [e.target.name]: e.target.value };
    this.setState(() => ({ items: items }));
  }
  onDeckInputChange(name, value) {
    this.setState(() => ({ [name]: value }));
  }
  onCreateDeck() {
    const { title, description, items } = this.state;
    this.props.actions.createDeck({
      title: title,
      description: description,
      items: items
    });
  }

  render() {
    const { title, description, items } = this.state;
    return (
      <Header className="newDeck-page">
        <div className="container margin-top">
          <div className="row">
            <div className="text-right col-xs-12">
              <button onClick={this.onAddCard} type="button" className="btn-addItem btn">
                Add item +
              </button>
            </div>
          </div>
          <form className="form-saveDeck" onSubmit={e => e.preventDefault()}>
            <div className="row">
              <div className="col-xs-12 col-sm-4 editDeckInfo-wrapper">
                <div className="editDeckInfo">
                  <div className="form-group">
                    <label htmlFor="title">Deck title</label>
                    <input
                      onChange={e => this.onDeckInputChange(e.target.name, e.target.value)}
                      value={title}
                      name="title"
                      className="form-control"
                      type="text"
                      placeholder="Add a deck title..."
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Deck description</label>
                    <textarea
                      onChange={e => this.onDeckInputChange(e.target.name, e.target.value)}
                      value={description}
                      name="description"
                      className="form-control"
                      type="textarea"
                      placeholder="Add a deck description..."
                    />
                  </div>
                </div>
                <div className="btn-saveDeck-wrapper">
                  <button
                    onClick={this.onCreateDeck}
                    type="submit"
                    className="btn btn-saveDeck btn-primary btn-block"
                  >
                    Save Deck
                  </button>
                </div>
              </div>
              <div className="col-xs-12 col-sm-8 items--wrapper">
                <div className="row">
                  {items &&
                    items.length > 0 &&
                    items.map((item, key) => (
                      <EditItemCard
                        item={item}
                        onInputChange={e => this.onItemInputChange(e, key)}
                        onRemove={() => this.onRemoveCard(key)}
                        key={key}
                        index={key}
                      />
                    ))}
                </div>
              </div>
            </div>
          </form>
        </div>
      </Header>
    );
  }
}

const mapStateToProps = state => ({
  deck: state.data.deck
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(deckActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckNewContainer);
