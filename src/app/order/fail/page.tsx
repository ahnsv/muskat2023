export default function FailPage({searchParams}) {

  return (
    <main
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>결제 실패</h1>
      <p>이유: {searchParams?.message ?? "알 수 없음"}</p>
    </main>
  );
}