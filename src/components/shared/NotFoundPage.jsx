function NotFoundPage() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        margin: "auto",
        textAlign: "center",
        margin: "20px auto",
      }}
    >
      <h1>صفحه مورد نظر یافت نشد!</h1>
      <a href="/" style={{ fontSize: "1.3rem" }}>
        بازگشت
      </a>
      <img
        src="/404-error.webp"
        alt="404 page"
        style={{
          width: "100%",
          display: "block",
          margin: "20px auto",
          borderRadius: "24px",
        }}
      />
    </div>
  );
}

export default NotFoundPage;
