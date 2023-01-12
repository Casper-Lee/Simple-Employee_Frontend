import classes from './HighlightedQuote.module.css';

const HighlightedEmployee = (props: any) => {
  return (
    <figure className={classes.quote}>
      <p>{props.text}</p>
      <figcaption>{props.author}</figcaption>
    </figure>
  );
};

export default HighlightedEmployee;
