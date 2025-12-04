module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/UAS_SOSIALMEDIA/client-new/app/components/FollowButton.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$UAS_SOSIALMEDIA$2f$client$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/UAS_SOSIALMEDIA/client-new/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$UAS_SOSIALMEDIA$2f$client$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/UAS_SOSIALMEDIA/client-new/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const FollowButton = ({ userId })=>{
    const [relationshipData, setRelationshipData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$UAS_SOSIALMEDIA$2f$client$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentUser, setCurrentUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$UAS_SOSIALMEDIA$2f$client$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$UAS_SOSIALMEDIA$2f$client$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // 1. Get Current User from LocalStorage (Assuming you saved it during Login)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$UAS_SOSIALMEDIA$2f$client$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
    }, []);
    // 2. Fetch "Who follows this person?" to see if *I* am in the list
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$UAS_SOSIALMEDIA$2f$client$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const fetchRelationships = async ()=>{
            try {
                const res = await fetch(`http://localhost:5000/api/relationships?followedUserId=${userId}`);
                const data = await res.json();
                setRelationshipData(data); // data is array of IDs like [1, 5]
            } catch (err) {
                console.log(err);
            }
        };
        if (userId) fetchRelationships();
    }, [
        userId
    ]);
    // Check if I am following
    const isFollowing = currentUser ? relationshipData.includes(currentUser.id) : false;
    const handleFollow = async ()=>{
        if (!currentUser) {
            alert("Please login first!");
            return;
        }
        setLoading(true);
        try {
            if (isFollowing) {
                // UNFOLLOW Request
                await fetch(`http://localhost:5000/api/relationships?userId=${userId}`, {
                    method: "DELETE",
                    credentials: "include"
                });
                // Update local state: Remove my ID
                setRelationshipData((prev)=>prev.filter((id)=>id !== currentUser.id));
            } else {
                // FOLLOW Request
                await fetch(`http://localhost:5000/api/relationships`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userId
                    }),
                    credentials: "include"
                });
                // Update local state: Add my ID
                setRelationshipData((prev)=>[
                        ...prev,
                        currentUser.id
                    ]);
            }
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };
    // If viewing my own profile in search results, hide the button
    if (currentUser && userId === currentUser.id) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$UAS_SOSIALMEDIA$2f$client$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: handleFollow,
        disabled: loading,
        style: {
            border: "none",
            padding: "8px 16px",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            backgroundColor: isFollowing ? "#e0e0e0" : "#000",
            color: isFollowing ? "#333" : "#fff",
            transition: "0.2s"
        },
        children: loading ? "..." : isFollowing ? "Following" : "Follow"
    }, void 0, false, {
        fileName: "[project]/UAS_SOSIALMEDIA/client-new/app/components/FollowButton.tsx",
        lineNumber: 71,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = FollowButton;
}),
"[project]/UAS_SOSIALMEDIA/client-new/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$UAS_SOSIALMEDIA$2f$client$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/UAS_SOSIALMEDIA/client-new/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$UAS_SOSIALMEDIA$2f$client$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/UAS_SOSIALMEDIA/client-new/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
// 1. Import the Follow Button Component
var __TURBOPACK__imported__module__$5b$project$5d2f$UAS_SOSIALMEDIA$2f$client$2d$new$2f$app$2f$components$2f$FollowButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/UAS_SOSIALMEDIA/client-new/app/components/FollowButton.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
function Home() {
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$UAS_SOSIALMEDIA$2f$client$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [results, setResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$UAS_SOSIALMEDIA$2f$client$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [searched, setSearched] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$UAS_SOSIALMEDIA$2f$client$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$UAS_SOSIALMEDIA$2f$client$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Function to handle the search submission
    const handleSearch = async (e)=>{
        e.preventDefault();
        if (!query) return;
        setLoading(true);
        setSearched(true);
        try {
            const res = await fetch(`http://localhost:5000/api/users/search?q=${query}`);
            const data = await res.json();
            if (Array.isArray(data)) {
                setResults(data);
            } else {
                setResults([]);
                console.error("API Error:", data);
            }
        } catch (err) {
            console.error(err);
            setResults([]);
        }
        setLoading(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$UAS_SOSIALMEDIA$2f$client$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minHeight: "100vh",
            padding: "40px 20px",
            maxWidth: "600px",
            margin: "0 auto",
            fontFamily: "var(--font-geist-sans), sans-serif"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$UAS_SOSIALMEDIA$2f$client$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: "40px",
                    textAlign: "center"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$UAS_SOSIALMEDIA$2f$client$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        style: {
                            fontSize: "32px",
                            fontWeight: "bold",
                            marginBottom: "10px"
                        },
                        children: "Find Friends"
                    }, void 0, false, {
                        fileName: "[project]/UAS_SOSIALMEDIA/client-new/app/page.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$UAS_SOSIALMEDIA$2f$client$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            color: "#666"
                        },
                        children: "Search for users by their username."
                    }, void 0, false, {
                        fileName: "[project]/UAS_SOSIALMEDIA/client-new/app/page.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/UAS_SOSIALMEDIA/client-new/app/page.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$UAS_SOSIALMEDIA$2f$client$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSearch,
                style: {
                    display: "flex",
                    gap: "10px",
                    marginBottom: "30px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$UAS_SOSIALMEDIA$2f$client$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        placeholder: "Type a username...",
                        value: query,
                        onChange: (e)=>setQuery(e.target.value),
                        style: {
                            flex: 1,
                            padding: "14px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            fontSize: "16px",
                            outline: "none"
                        }
                    }, void 0, false, {
                        fileName: "[project]/UAS_SOSIALMEDIA/client-new/app/page.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$UAS_SOSIALMEDIA$2f$client$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        disabled: loading,
                        style: {
                            padding: "14px 28px",
                            backgroundColor: "#000",
                            color: "#fff",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "bold",
                            opacity: loading ? 0.7 : 1
                        },
                        children: loading ? "Searching..." : "Search"
                    }, void 0, false, {
                        fileName: "[project]/UAS_SOSIALMEDIA/client-new/app/page.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/UAS_SOSIALMEDIA/client-new/app/page.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$UAS_SOSIALMEDIA$2f$client$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px"
                },
                children: [
                    searched && results.length === 0 && !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$UAS_SOSIALMEDIA$2f$client$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            textAlign: "center",
                            padding: "20px",
                            color: "#888"
                        },
                        children: [
                            'No users found matching "',
                            query,
                            '"'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/UAS_SOSIALMEDIA/client-new/app/page.tsx",
                        lineNumber: 93,
                        columnNumber: 11
                    }, this),
                    results.map((user)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$UAS_SOSIALMEDIA$2f$client$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "15px 20px",
                                border: "1px solid #eee",
                                borderRadius: "12px",
                                backgroundColor: "#fff",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$UAS_SOSIALMEDIA$2f$client$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "15px"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$UAS_SOSIALMEDIA$2f$client$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: "45px",
                                                height: "45px",
                                                borderRadius: "50%",
                                                backgroundColor: "#333",
                                                color: "#fff",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontSize: "20px",
                                                fontWeight: "bold"
                                            },
                                            children: user.username.charAt(0).toUpperCase()
                                        }, void 0, false, {
                                            fileName: "[project]/UAS_SOSIALMEDIA/client-new/app/page.tsx",
                                            lineNumber: 114,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$UAS_SOSIALMEDIA$2f$client$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$UAS_SOSIALMEDIA$2f$client$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    style: {
                                                        margin: "0 0 4px 0",
                                                        fontSize: "16px",
                                                        fontWeight: "600"
                                                    },
                                                    children: user.username
                                                }, void 0, false, {
                                                    fileName: "[project]/UAS_SOSIALMEDIA/client-new/app/page.tsx",
                                                    lineNumber: 130,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$UAS_SOSIALMEDIA$2f$client$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: "13px",
                                                        color: "#888"
                                                    },
                                                    children: user.email
                                                }, void 0, false, {
                                                    fileName: "[project]/UAS_SOSIALMEDIA/client-new/app/page.tsx",
                                                    lineNumber: 133,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/UAS_SOSIALMEDIA/client-new/app/page.tsx",
                                            lineNumber: 129,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/UAS_SOSIALMEDIA/client-new/app/page.tsx",
                                    lineNumber: 112,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$UAS_SOSIALMEDIA$2f$client$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$UAS_SOSIALMEDIA$2f$client$2d$new$2f$app$2f$components$2f$FollowButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    userId: user.id
                                }, void 0, false, {
                                    fileName: "[project]/UAS_SOSIALMEDIA/client-new/app/page.tsx",
                                    lineNumber: 140,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, user.id, true, {
                            fileName: "[project]/UAS_SOSIALMEDIA/client-new/app/page.tsx",
                            lineNumber: 99,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/UAS_SOSIALMEDIA/client-new/app/page.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/UAS_SOSIALMEDIA/client-new/app/page.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
}),
"[project]/UAS_SOSIALMEDIA/client-new/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/UAS_SOSIALMEDIA/client-new/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/UAS_SOSIALMEDIA/client-new/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/UAS_SOSIALMEDIA/client-new/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/UAS_SOSIALMEDIA/client-new/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__02074c0a._.js.map