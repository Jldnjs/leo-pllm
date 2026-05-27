"use client";

import { useState, MouseEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  // 상태 관리: 비밀번호 표시 여부 및 배경 패턴 위치
  const [showPassword, setShowPassword] = useState(false);
  const [bgPosition, setBgPosition] = useState({ x: 0, y: 0 });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // 마우스 이동 이벤트 핸들러 (패럴랙스 효과)
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const x = (e.clientX / window.innerWidth) * 10;
    const y = (e.clientY / window.innerHeight) * 10;
    setBgPosition({ x, y });
  };

  // 폼 제출 방지 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: FastAPI 백엔드로 데이터 전송 로직 추가
    console.log("로그인 시도");

    try {
      const response = await fetch("http://localhost:8000/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "로그인 실패");
      }

      alert(`${result.user.email}님 환영합니다. role : ${result.user.role}`);

      if (result.user.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/chat");
      }

    }
    catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="bg-surface text-on-background min-h-screen flex flex-col font-body"
      onMouseMove={handleMouseMove}
    >
      {/* Top Navigation */}
      <header className="flex items-center justify-between px-6 md:px-12 py-6 border-b border-outline-variant bg-surface-container-lowest">
        <div className="flex items-center gap-4 text-on-background">
          <div className="size-8 text-gold-accent">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z" fill="currentColor"></path>
              <path clipRule="evenodd" fillRule="evenodd" d="M39.998 12.236C39.9944 12.2537 39.9875 12.2845 39.9748 12.3294C39.9436 12.4399 39.8949 12.5741 39.8346 12.7175C39.8168 12.7597 39.7989 12.8007 39.7813 12.8398C38.5103 13.7113 35.9788 14.9393 33.7095 15.4811C30.9875 16.131 27.6413 16.5217 24 16.5217C20.3587 16.5217 17.0125 16.131 14.2905 15.4811C12.0012 14.9346 9.44505 13.6897 8.18538 12.8168C8.17384 12.7925 8.16216 12.767 8.15052 12.7408C8.09919 12.6249 8.05721 12.5114 8.02977 12.411C8.00356 12.3152 8.00039 12.2667 8.00004 12.2612C8.00004 12.261 8 12.2607 8.00004 12.2612C8.00004 12.2359 8.0104 11.9233 8.68485 11.3686C9.34546 10.8254 10.4222 10.2469 11.9291 9.72276C14.9242 8.68098 19.1919 8 24 8C28.8081 8 33.0758 8.68098 36.0709 9.72276C37.5778 10.2469 38.6545 10.8254 39.3151 11.3686C39.9006 11.8501 39.9857 12.1489 39.998 12.236ZM4.95178 15.2312L21.4543 41.6973C22.6288 43.5809 25.3712 43.5809 26.5457 41.6973L43.0534 15.223C43.0709 15.1948 43.0878 15.1662 43.104 15.1371L41.3563 14.1648C43.104 15.1371 43.1038 15.1374 43.104 15.1371L43.1051 15.135L43.1065 15.1325L43.1101 15.1261L43.1199 15.1082C43.1276 15.094 43.1377 15.0754 43.1497 15.0527C43.1738 15.0075 43.2062 14.9455 43.244 14.8701C43.319 14.7208 43.4196 14.511 43.5217 14.2683C43.6901 13.8679 44 13.0689 44 12.2609C44 10.5573 43.003 9.22254 41.8558 8.2791C40.6947 7.32427 39.1354 6.55361 37.385 5.94477C33.8654 4.72057 29.133 4 24 4C18.867 4 14.1346 4.72057 10.615 5.94478C8.86463 6.55361 7.30529 7.32428 6.14419 8.27911C4.99695 9.22255 3.99999 10.5573 3.99999 12.2609C3.99999 13.1275 4.29264 13.9078 4.49321 14.3607C4.60375 14.6102 4.71348 14.8196 4.79687 14.9689C4.83898 15.0444 4.87547 15.1065 4.9035 15.1529C4.91754 15.1762 4.92954 15.1957 4.93916 15.2111L4.94662 15.223L4.95178 15.2312ZM35.9868 18.996L24 38.22L12.0131 18.996C12.4661 19.1391 12.9179 19.2658 13.3617 19.3718C16.4281 20.1039 20.0901 20.5217 24 20.5217C27.9099 20.5217 31.5719 20.1039 34.6383 19.3718C35.082 19.2658 35.5339 19.1391 35.9868 18.996Z" fill="currentColor"></path>
            </svg>
          </div>
          <h1 className="font-headline text-2xl tracking-tight">Leo AI</h1>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background Atmospheric Element (상태 적용) */}
        <div
          className="absolute inset-0 leopard-pattern opacity-40 pointer-events-none transition-transform duration-75"
          style={{ backgroundPosition: `${bgPosition.x}px ${bgPosition.y}px` }}
        />

        {/* Login Card */}
        <div className="w-full max-w-[480px] bg-white rounded-lg shadow-sm border border-outline-variant relative overflow-hidden z-10">
          <div className="h-1.5 w-full bg-luxury-charcoal flex">
            <div className="h-full w-1/4 bg-gold-accent"></div>
          </div>

          <div className="p-10">
            <div className="mb-10">
              <span className="text-gold-accent text-xs font-medium uppercase tracking-[0.2em] block mb-2">Enterprise Portal</span>
              <h2 className="font-headline text-3xl text-on-surface">Sign In</h2>
            </div>

            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="group">
                <label className="block text-on-surface font-medium mb-1 uppercase tracking-wider text-[11px]" htmlFor="email">
                  Corporate Email
                </label>
                <input
                  className="luxury-input w-full font-body text-base py-3"
                  id="email"
                  name="email"
                  placeholder="name@company.com"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="group relative">
                <label className="block text-on-surface font-medium mb-1 uppercase tracking-wider text-[11px]" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    className="luxury-input w-full font-body text-base py-3 pr-10"
                    id="password"
                    name="password"
                    placeholder=""
                    required
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {/* 비밀번호 표시 토글 버튼 */}
                  <button
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-gold-accent transition-colors"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between font-medium text-sm">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input className="peer appearance-none size-4 border border-outline rounded-sm checked:bg-gold-accent checked:border-gold-accent transition-all" type="checkbox" />
                    <span className="material-symbols-outlined absolute text-[10px] text-white opacity-0 peer-checked:opacity-100 transition-opacity">check</span>
                  </div>
                  <span className="text-on-surface-variant group-hover:text-on-surface transition-colors">Remember this device</span>
                </label>
                <a className="text-gold-accent hover:text-luxury-charcoal transition-colors" href="#">비밀번호 찾기</a>
              </div>

              <div className="space-y-4 pt-4">
                <button className="gold-button w-full h-14 flex items-center justify-center text-white font-medium uppercase tracking-widest transition-all rounded-lg" type="submit">
                  Sign In
                </button>

              </div>
            </form>
          </div>

          <div className="px-10 py-6 bg-surface-container-low border-t border-outline-variant flex items-center justify-center gap-6">
            <span className="text-[10px] text-on-surface-variant uppercase tracking-[0.25em]">End-to-End Encrypted</span>
            <div className="size-1 bg-outline-variant rounded-full"></div>
            <span className="text-[10px] text-on-surface-variant uppercase tracking-[0.25em]">ISO 27001 Certified</span>
          </div>
        </div>
      </main>

      <footer className="px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-on-surface-variant border-t border-outline-variant bg-white">
        <div className="flex items-center gap-6">
          <span className="text-sm font-medium uppercase tracking-tighter">© 2024 Leo AI Enterprise</span>
          <a className="text-sm font-medium uppercase tracking-tighter hover:text-gold-accent" href="#">Legal</a>
          <a className="text-sm font-medium uppercase tracking-tighter hover:text-gold-accent" href="#">Privacy</a>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Support ID: EXEC-8821</span>
          <div className="size-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-sm font-medium uppercase tracking-widest">Systems Operational</span>
        </div>
      </footer>
    </div>
  );
}