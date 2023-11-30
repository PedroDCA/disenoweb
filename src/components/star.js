function Star({ filled }) {
    return <span className={filled ? "star filled" : "star"}>{filled ? '★' : '☆'}</span>;
  }

  export default Star;