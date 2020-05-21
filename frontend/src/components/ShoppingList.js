import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, ListGroup, Button, ListGroupItem } from 'reactstrap';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { addItem, removeItem } from './../store/ducks/items.reducer';

import { v4 as uuidv4 } from 'uuid'; // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

const ShoppingList = () => {
  //const [items, setItems] = useState();
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();
  /*
onClick={() => {
          const name = prompt('Enter Item');
          if (name) {
            setItems((items) => [{ id: uuidv4(), name }, ...items]);
          }
        }}
onClick={() =>
                      setItems((items) =>
                        items.filter((item) => item.id !== id),
                      )
                    }
*/
  const onHandleItem = () => {
    const name = prompt('Enter Item');
    if (name) {
      //console.log(name);
      dispatch(
        addItem({
          id: uuidv4(),
          name,
        }),
      );
    }
  };

  const onHandleRemove = (id) => {
    console.log('onHandleRemove', id);
    dispatch(removeItem(id));
  };

  return (
    <Container style={{ maxWidth: '600px' }}>
      <Button
        color="dark"
        style={{ marginBottom: '2rem' }}
        onClick={onHandleItem}
      >
        Add Item
      </Button>

      <ListGroup>
        <TransitionGroup>
          {items.map(({ id, name }) => (
            <CSSTransition key={id} timeout={500} classNames="item">
              <ListGroup>
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={() => onHandleRemove(id)}
                  >
                    &times;
                  </Button>

                  {name}
                </ListGroupItem>
              </ListGroup>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

export default ShoppingList;
