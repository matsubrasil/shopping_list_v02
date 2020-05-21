import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, ListGroup, Button, ListGroupItem } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { getAllItemsFetch, removeItemFetch } from '../store/fetchActions/index';

// import { v4 as uuidv4 } from 'uuid'; // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

const ShoppingList = () => {
  //const [items, setItems] = useState();
  const { list } = useSelector((state) => state.items);
  const dispatch = useDispatch();

  useEffect(() => dispatch(getAllItemsFetch()), [dispatch]);

  const onHandleRemove = (id) => {
    //console.log('onHandleRemove', id);
    dispatch(removeItemFetch(id));
  };

  return (
    <Container>
      <ListGroup>
        <TransitionGroup>
          {list.map(({ _id, name }) => (
            <CSSTransition key={_id} timeout={500} classNames="item">
              <ListGroup>
                <ListGroupItem key={_id}>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={() => onHandleRemove(_id)}
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

/*
const onHandleItem = () => {
    const name = prompt('Enter Item');
    if (name) {
      //console.log(name);
      dispatch(
        saveItemFetch({
          name,
        }),
      );
    }
  };
<Button
        color="dark"
        style={{ marginBottom: '2rem' }}
        onClick={onHandleItem}
      >
        Add Item
      </Button>


      
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
