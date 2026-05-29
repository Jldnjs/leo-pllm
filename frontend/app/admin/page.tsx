"use client";

import { useState, useEffect } from "react";

interface SimpleUser {
    email: string;
    role: string;
}

export default function AdminPage() {
    // 우측 등록 패널 열림/닫힘 상태 관리
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [role, setRole] = useState("USER");

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    // Escape 키 누르면 패널 닫히는 단축키 기능 (useEffect로 구현)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsPanelOpen(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);

    }, []);


    // 신규 직원 등록
    const handleSaveMember = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password || !name || !role) {
            alert('필수항목을 입력해주세요.');
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/admin/saveMember`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    role: role,
                    mobile: mobile
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.detail || "회원 등록 실패");
            }

            alert(`${email}계정이 성공적으로 등록되었습니다.`);
            setIsPanelOpen(false);

            setName("");
            setEmail("");
            setPassword("");
            setRole("USER");
            setMobile("");
        } catch (error: any) {
            console.error("등록에러 : ", error);
            alert(error.message);
        }
    };


    return (
        <div className="bg-background text-on-surface min-h-screen selection:bg-secondary-fixed custom-scrollbar overflow-x-hidden">


            {/* Sidebar Navigation */}
            <aside className="h-screen w-64 fixed left-0 top-0 flex flex-col py-6 border-r border-outline-variant bg-surface z-50">
                <div className="px-6 mb-10">
                    <h1 className="font-headline-md text-headline-md font-bold text-on-surface">Leo AI</h1>
                </div>

                <div className="px-6 mt-auto">
                    <button
                        onClick={() => setIsPanelOpen(true)}
                        className="w-full py-3 bg-[#1A1A1A] text-white font-label-md text-label-md transition-all luxury-button-hover flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined text-[18px]">신규 등록</span>

                    </button>
                </div>
            </aside>

            {/* Top App Bar */}
            <header className="flex justify-between items-center h-16 px-16 w-[calc(100%-16rem)] ml-64 bg-surface border-b border-outline-variant sticky top-0 z-40">
                <div className="flex items-center flex-1 max-w-xl">
                    <div className="relative w-full group">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
                        <input className="w-full bg-transparent border-b border-outline-variant focus:border-secondary transition-all outline-none pl-10 py-1 font-body-md text-body-md" placeholder="Search members..." type="text" />
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-all">notifications</button>
                    <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-all">Sign out</button>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="ml-64 p-6 max-w-[1440px] mx-auto min-h-[calc(100vh-64px)]">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Enterprise Members</h2>
                        <p className="font-body-md text-body-md text-on-surface-variant mt-1">Manage platform access and permissions for your team.</p>
                    </div>
                    <button
                        className="bg-[#1A1A1A] text-white px-8 py-3 font-label-md text-label-md transition-all luxury-button-hover flex items-center gap-2"
                        onClick={() => setIsPanelOpen(true)}
                    >
                        <span className="material-symbols-outlined text-[20px]">삭제</span>

                    </button>
                </div>

                {/* Membership Table */}
                <div className="bg-surface-container-lowest border border-outline-variant overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-outline-variant bg-surface-container-low">
                                <th className="p-6 w-12">
                                    <input className="w-4 h-4 border-outline rounded-none text-secondary focus:ring-secondary" type="checkbox" />
                                </th>
                                <th className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider p-6">이름</th>
                                <th className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider p-6">Email</th>
                                <th className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider p-6">전화번호</th>
                                <th className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider p-6">퇴사예정일</th>
                                <th className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider p-6">Status</th>
                                <th className="p-6"></th>
                            </tr>
                        </thead>
                        <tbody class="font-body-md text-body-md">
                            {/* Row 1 */}
                            <tr className="border-b border-outline-variant hover:bg-surface-bright transition-colors group">
                                <td className="p-6"><input className="w-4 h-4 border-outline rounded-none text-secondary focus:ring-secondary" type="checkbox" /></td>
                                <td className="p-6 font-semibold text-on-surface">Alexander Sterling</td>
                                <td className="p-6 text-on-surface-variant">a.sterling@aether.ai</td>
                                <td className="p-6 text-on-surface-variant">+1 (555) 012-3456</td>
                                <td className="p-6 text-on-surface-variant">2026.08.10</td>
                                <td className="p-6">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input defaultChecked className="sr-only peer" type="checkbox" />
                                        <div className="w-10 h-5 bg-surface-container-highest peer-focus:outline-none rounded-full transition-all duration-300 peer-checked:bg-secondary"></div>
                                        <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-all duration-300 transform peer-checked:translate-x-full"></div>
                                    </label>
                                </td>
                                <td className="p-6 text-right"><button className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">edit</button></td>
                            </tr>
                            {/* Row 2 */}
                            <tr className="border-b border-outline-variant hover:bg-surface-bright transition-colors group">
                                <td className="p-6"><input className="w-4 h-4 border-outline rounded-none text-secondary focus:ring-secondary" type="checkbox" /></td>
                                <td className="p-6 font-semibold text-on-surface">Evelyn Dubois</td>
                                <td className="p-6 text-on-surface-variant">e.dubois@aether.ai</td>
                                <td className="p-6 text-on-surface-variant">+1 (555) 987-6543</td>
                                <td></td>
                                <td className="p-6">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input defaultChecked className="sr-only peer" type="checkbox" />
                                        <div className="w-10 h-5 bg-surface-container-highest peer-focus:outline-none rounded-full transition-all duration-300 peer-checked:bg-secondary"></div>
                                        <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-all duration-300 transform peer-checked:translate-x-full"></div>
                                    </label>
                                </td>
                                <td className="p-6 text-right"><button className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">edit</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>

            {/* 🚪 Side Slide-out Form Panel (리액트 상태 제어 반영) */}
            <div
                className={`fixed inset-0 bg-[#1A1A1A]/20 transition-opacity duration-300 z-[60] ${isPanelOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={() => setIsPanelOpen(false)}
            />
            <aside
                className={`fixed right-0 top-0 h-screen w-[480px] bg-white transition-transform duration-500 ease-in-out z-[70] flex flex-col border-l border-outline-variant shadow-2xl ${isPanelOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="p-10 flex-1 overflow-y-auto custom-scrollbar">
                    <div className="flex justify-between items-start mb-12">
                        <div>
                            <h3 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">직원 등록</h3>
                            <p className="font-body-md text-body-md text-on-surface-variant mt-2">Provision a new account for your enterprise workspace.</p>
                        </div>
                        <button className="material-symbols-outlined text-on-surface-variant hover:text-error transition-all p-2" onClick={() => setIsPanelOpen(false)}>X</button>
                    </div>

                    <form className="space-y-10">
                        <div className="space-y-6">
                            <div className="relative">
                                <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">이름</label>
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-transparent border-b border-outline focus:border-secondary outline-none py-3 font-body-md text-body-md transition-all placeholder:text-outline-variant"
                                    placeholder="김레오"
                                    type="text"
                                />
                            </div>
                            <div className="relative">
                                <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">Email</label>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-transparent border-b border-outline focus:border-secondary outline-none py-3 font-body-md text-body-md transition-all placeholder:text-outline-variant"
                                    placeholder="leo@leopard.co.kr"
                                    type="email"
                                />
                            </div>
                            <div className="relative">
                                <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">전화번호</label>
                                <input
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    className="w-full bg-transparent border-b border-outline focus:border-secondary outline-none py-3 font-body-md text-body-md transition-all placeholder:text-outline-variant"
                                    placeholder="01012345678"
                                    type="tel"
                                />
                            </div>
                            <div className="relative">
                                <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">비밀번호</label>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-transparent border-b border-outline focus:border-secondary outline-none py-3 font-body-md text-body-md transition-all placeholder:text-outline-variant"
                                    placeholder="비밀번호 입력"
                                    type="password"
                                />
                            </div>
                        </div>
                        <div className="pt-8 leopard-pattern p-6 border border-outline-variant/30">
                            <h4 className="font-label-sm text-label-sm text-on-surface font-bold uppercase mb-4">Role & Access</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    className={`p-4 text-left transition-all border rounded-none ${role === "USER" ? "border-gold-accent bg-surface-container-low ring-1 ring-gold-accent" : "border-outline-variant hover:border-gold-accent"}`}
                                    onClick={() => setRole("USER")}
                                    type="button"
                                >
                                    <span className={`block font-label-md text-label-md ${role === "USER" ? "text-gold-accent font-bold" : "text-on-surface"}`}>Member</span>
                                    <span className="text-xs text-on-surface-variant">Basic AI access</span>
                                </button>
                                <button
                                    className={`p-4 text-left transition-all border rounded-none ${role === "ADMIN" ? "border-gold-accent bg-surface-container-low ring-1 ring-gold-accent" : "border-outline-variant hover:border-gold-accent"}`}
                                    onClick={() => setRole("ADMIN")}
                                    type="button"
                                >
                                    <span className={`block font-label-md text-label-md ${role === "ADMIN" ? "text-gold-accent font-bold" : "text-on-surface"}`}>Admin</span>
                                    <span className="text-xs text-on-surface-variant">Full platform control</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="p-10 border-t border-outline-variant flex gap-4 bg-surface-container-lowest">
                    <button className="flex-1 py-4 border border-outline text-on-surface font-label-md text-label-md hover:bg-surface-container-low transition-all" onClick={() => setIsPanelOpen(false)}>취소</button>
                    <button className="flex-1 py-4 bg-[#1A1A1A] text-white font-label-md text-label-md luxury-button-hover transition-all" onClick={handleSaveMember}> 저장 </button>
                </div>
            </aside>
        </div>
    );
}