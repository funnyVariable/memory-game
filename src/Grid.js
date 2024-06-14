import apple from "./apple.svg";

export default function Grid() {
  return (
    <div className="grid">
      {[...Array(25)].map((e, i) => (
        <img key={i} src={apple} alt="apple" />
      ))}
    </div>
  );
}
