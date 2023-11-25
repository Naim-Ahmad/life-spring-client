export function Image({test}) {
    return (
      <img
        className={test?.imageURL}
        alt={test?.testName}
      />
    );
  }