"use client";

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./AuthForm.module.css";

const stripTags = (s) => String(s ?? "").replace(/<\/?[^>]+>/g, "");

export default function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [isLogin, setIsLogin] = useState(true);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    if (callbackUrl !== "/") {
      setStatusMessage("Please sign in to continue");
    }
  }, [callbackUrl]);

  const handleToggle = () => {
    setIsLogin((prev) => !prev);
    setErrors("");
    setStatusMessage("");
    setData({ email: "", password: "" });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    setIsSubmitting(true);

    const email = stripTags(data.email).trim().toLowerCase();
    const password = stripTags(data.password);

    try {
      if (isLogin) {
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
          callbackUrl,
        });

        if (result?.error) {
          setErrors("Invalid email or password.");
        } else {
          router.push(result?.url || callbackUrl);
          router.refresh();
        }
      } else {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const responseData = await res.json();

        if (!res.ok) {
          setErrors(responseData.error || "Registration failed.");
          return;
        }

        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
          callbackUrl,
        });

        if (result?.error) {
          setErrors("Account created, but sign-in failed.");
        } else {
          router.push(result?.url || callbackUrl);
          router.refresh();
        }
      }
    } catch (error) {
      console.error(error);
      setErrors("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{isLogin ? "Sign In" : "Register"}</h1>

      {statusMessage && <p className={styles.message}>{statusMessage}</p>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={data.password}
          onChange={handleChange}
          required
        />

        {errors && <p className={styles.error}>{errors}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? isLogin
              ? "Signing in..."
              : "Registering..."
            : isLogin
            ? "Sign In"
            : "Register"}
        </button>
      </form>

      {isLogin && (
        <div className={styles.oauthButtons}>
          <button
            type="button"
            onClick={() => signIn("github", { callbackUrl })}
            className={styles.oauthButton}
          >
            Sign in with GitHub
          </button>

          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl })}
            className={styles.oauthButton}
          >
            Sign in with Google
          </button>
        </div>
      )}

      <p className={styles.toggleText}>
        {isLogin ? "Don't have an account?" : "Already have an account?"}
      </p>

      <button
        type="button"
        onClick={handleToggle}
        className={styles.toggleButton}
      >
        {isLogin ? "Register" : "Sign In"}
      </button>
    </div>
  );
}