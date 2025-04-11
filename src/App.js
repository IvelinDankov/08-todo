import { useState } from "react";

function App() {
  return (
    <div className="app">
      <Header />
      <TodoContainer />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h2>header</h2>
    </header>
  );
}

function TodoContainer() {
  const [createdItem, setCreatedItem] = useState([]);
  console.log(createdItem);

  function handleDeleteItem(id) {
    let updatedItems = createdItem.filter((item) => item.id !== id);
    setCreatedItem(updatedItems);
  }

  function handeEditItem(item) {}

  return (
    <div className="todo-container">
      <TodoHeader setCreatedItem={setCreatedItem} />
      <hr />
      <TodoResultList
        createdItem={createdItem}
        onDeleteItem={handleDeleteItem}
      />
    </div>
  );
}

function TodoHeader({ setCreatedItem }) {
  const [newItem, setNewItem] = useState("");

  function handleAddNewTodo(e) {
    e.preventDefault();

    const newCreatedItem = {
      id: crypto.randomUUID(),
      title: newItem,
    };

    setCreatedItem((items) => [...items, newCreatedItem]);
    setNewItem("");
  }

  return (
    <header className="todo-header">
      <div className="todo-header-box">
        <h2>To-Dos</h2>
        🛜
      </div>

      <form className="todo-header__cta" onSubmit={handleAddNewTodo}>
        <input
          type="text"
          placeholder="new todo"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button> ➕ </button>
      </form>
    </header>
  );
}
function TodoResultList({ createdItem, onDeleteItem }) {
  return (
    <ul className="todo-results__list">
      {createdItem.map((item) => (
        <TodoResultItem key={item.id} item={item} onDeleteItem={onDeleteItem} />
      ))}
    </ul>
  );
}

function TodoResultItemHeader({ item, onDeleteItem, onClickItem }) {
  const [taskIsChecked, setTaskIsChecked] = useState(false);

  function handleChange(e) {
    setTaskIsChecked(e.target.checked);
  }

  //

  return (
    <div className="item-header">
      <div className="form-new-todo">
        <input type="checkbox" value={taskIsChecked} onChange={handleChange} />
      </div>
      <div className="item-header-box" onClick={onClickItem}>
        <h3 className={taskIsChecked ? "checked-task" : ""}> {item.title} </h3>
        <div className="item-header-cta">
          <button>🖊️</button>
          <button onClick={() => onDeleteItem(item.id)}>🪣</button>
        </div>
      </div>
    </div>
  );
}

function ItemExtraList({ extraItems }) {
  return (
    <ul className="todo-item__extratasks">
      {extraItems.map((item) => (
        <ExtraTasks key={item.id} item={item} />
      ))}
    </ul>
  );
}

function ExtraTasks({ item }) {
  const [checkboxItem, setCheckbox] = useState(false);

  function handleCheckbox(e) {
    // const selectedItem = item.id === e.target.id;
    setCheckbox(e.target.checked);
  }
  return (
    <li>
      <input
        id={item.id}
        type="checkbox"
        value={checkboxItem}
        key={item.id}
        onChange={handleCheckbox}
      />
      <h4 className={checkboxItem ? "checked" : ""}> {item.title} </h4>
      <p className={checkboxItem ? "checked" : ""}> {item.note} </p>
      <span className={checkboxItem ? "checked" : ""}> {item.date} </span>
    </li>
  );
}

function ItemExtraForm({ setExtraItems }) {
  const [extraTitle, setExtraTitle] = useState("");
  const [extraNotes, setExtraNotes] = useState("");
  const [date, setDate] = useState("");

  function handleSubmitForm(e) {
    e.preventDefault();

    if (!extraTitle || !date) {
      return;
    }

    const extraNewTask = {
      id: crypto.randomUUID(),
      title: extraTitle,
      note: extraNotes,
      date,
    };

    setExtraItems((items) => [...items, extraNewTask]);

    setExtraTitle("");
    setExtraNotes("");
    setDate("");
  }

  return (
    <form className="form-add-next-todo" onSubmit={handleSubmitForm}>
      <label> Text: </label>
      <input
        type="text"
        placeholder="Finish Taxes"
        value={extraTitle}
        onChange={(e) => setExtraTitle(e.target.value)}
      />
      <label htmlFor="textarea"> Extra Notes </label>
      <textarea
        placeholder="optional"
        name="textarea"
        minLength={10}
        id="extra"
        value={extraNotes}
        onChange={(e) => setExtraNotes(e.target.value)}
      ></textarea>
      <hr />
      <label htmlFor="">Due Date:</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button>Save</button>
    </form>
  );
}

function TodoResultItem({ item, onDeleteItem }) {
  const [showExtraItem, setShowExtraItem] = useState(false);
  const [extraItems, setExtraItems] = useState([]);

  function handleClickItem() {
    setShowExtraItem((show) => !show);
  }

  return (
    <li className="todo-result__item">
      <TodoResultItemHeader
        item={item}
        onDeleteItem={onDeleteItem}
        onClickItem={handleClickItem}
      />
      {showExtraItem && (
        <div className="todo-item__extra">
          <ItemExtraList extraItems={extraItems} />
          <hr />
          <ItemExtraForm setExtraItems={setExtraItems} />
        </div>
      )}
    </li>
  );
}

export default App;
