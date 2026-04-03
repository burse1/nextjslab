"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./ProfileForm.module.css";

const stripTags = (s) => String(s ?? "").replace(/<\/?[^>]+>/g, "");
const trimCollapse = (s) =>
  String(s ?? "")
    .trim()
    .replace(/\s+/g, " ");

export default function ProfileForm({
  mode = "add",
  initialValues,
  profileId = null,
}) {
  const router = useRouter();
  const nameRef = useRef(null);

  const [values, setValues] = useState({
    name: initialValues?.name || "",
    title: initialValues?.title || "",
    email: initialValues?.email || "",
    bio: initialValues?.bio || "",
    img: null,
  });

  const [currentImage, setCurrentImage] = useState(
    initialValues?.image_url || ""
  );
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { name, title, email, bio, img } = values;

  useEffect(() => {
    if (mode === "edit" && initialValues) {
      setValues({
        name: initialValues.name || "",
        title: initialValues.title || "",
        email: initialValues.email || "",
        bio: initialValues.bio || "",
        img: null,
      });

      setCurrentImage(initialValues.image_url || "");
    }
  }, [mode, initialValues]);

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, []);

  const onChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "img") {
      const file = files[0];

      if (file && file.size < 1024 * 1024) {
        setValues((prev) => ({ ...prev, img: file }));
        setErrors("");
      } else if (file) {
        setErrors("Image size should be less than 1MB");
      }
    } else {
      setValues((prev) => ({ ...prev, [name]: value }));
      setErrors("");
    }
  };

  const handleDelete = async () => {
    if (!profileId) return;

    const confirmed = window.confirm("Are you sure you want to delete this profile?");
    if (!confirmed) return;

    try {
      setErrors("");
      const response = await fetch(`/api/profiles/${profileId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete profile");
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      setErrors(error.message || "Failed to delete profile");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("name", stripTags(trimCollapse(name)));
      formData.append("title", stripTags(trimCollapse(title)));
      formData.append("email", stripTags(trimCollapse(email)));
      formData.append("bio", stripTags(bio).trim());

      if (img) {
        formData.append("img", img);
      }

      const url =
        mode === "edit" ? `/api/profiles/${profileId}` : "/api/profiles";

      const method = mode === "edit" ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit form");
      }

      setSuccess(
        mode === "edit"
          ? "Profile updated successfully!"
          : "Profile added successfully!"
      );

      if (mode === "add") {
        setValues({
          name: "",
          title: "",
          email: "",
          bio: "",
          img: null,
        });

        const fileInput = document.getElementById("img");
        if (fileInput) fileInput.value = "";
      }

      setTimeout(() => {
  router.push("/");
  router.refresh();
}, 1200);
    } catch (error) {
      setErrors(error.message || "Failed to submit form");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formWrap}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          ref={nameRef}
          type="text"
          name="name"
          id="name"
          required
          value={name}
          onChange={onChange}
        />

        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          required
          value={title}
          onChange={onChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          value={email}
          onChange={onChange}
        />

        <label htmlFor="bio">Bio:</label>
        <textarea
          name="bio"
          id="bio"
          placeholder="Add Bio..."
          required
          value={bio}
          onChange={onChange}
        ></textarea>

        {currentImage && (
          <>
            <label>Current Image:</label>
            <img
              src={currentImage}
              alt={name || "Current profile image"}
              className={styles.previewImage}
            />
          </>
        )}

        <label htmlFor="img">
          {mode === "edit" ? "Replace Image (optional):" : "Image:"}
        </label>
        <input
          type="file"
          name="img"
          id="img"
          accept="image/png, image/jpeg, image/jpg, image/gif"
          onChange={onChange}
          required={mode === "add"}
        />

        {errors && <p className={styles.errorMessage}>{errors}</p>}

        <div className={styles.buttonRow}>
          <button
            type="submit"
            disabled={
              isSubmitting ||
              !stripTags(trimCollapse(name)) ||
              !stripTags(trimCollapse(title)) ||
              !stripTags(trimCollapse(email)) ||
              !stripTags(bio).trim() ||
              (mode === "add" && !img)
            }
          >
            {isSubmitting
              ? mode === "edit"
                ? "Updating..."
                : "Submitting..."
              : mode === "edit"
              ? "Update Profile"
              : "Add Profile"}
          </button>

          {mode === "edit" && (
            <button
              type="button"
              onClick={handleDelete}
              className={styles.deleteButton}
            >
              Delete Profile
            </button>
          )}
        </div>

        {success && <p className={styles.successMessage}>{success}</p>}
      </form>
    </div>
  );
}