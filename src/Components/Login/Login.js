const Login = ({ onclick }) => {
  return (
    <div
      style={{
        background: "maroon",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        style={{
          width: "200px",
          height: "50px",
        }}
        onClick={onclick}
      >
        log me in
      </button>
    </div>
  );
};

export default Login;
