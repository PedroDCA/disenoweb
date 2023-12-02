function Star({ filled }) {
  return (
    <svg className={`star ${filled ? 'filled' : ''}`} width="24" height="24" viewBox="0 0 24 24">
      <path d="M9.5 14.25l-5.584 2.936 1.066-6.218L.465 6.564l6.243-.907L9.5 0l2.792 5.657 6.243.907-4.517 4.404 1.066 6.218"/>
    </svg>
  );
}

export default Star;