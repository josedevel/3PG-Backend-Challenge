const Book = (props) => {

    console.log(props);

    return (
      <div>
          {props.data.title}
      </div>
    );
};

export default Book;