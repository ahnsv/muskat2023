import Link from "next/link";

export default function FailPage({searchParams}) {

  return (
    <main
      className="flex flex-col items-center h-screen justify-center space-y-4"
    >
      <h1>결제 실패</h1>
      <p>이유: {searchParams?.message ?? "알 수 없음"}</p>
      <button className="bg-blue-400 rounded w-36 h-8">
        <Link href={`/`}>홈으로 돌아가기</Link>
      </button>
    </main>
  );
}