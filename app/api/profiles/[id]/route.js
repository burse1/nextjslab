import prisma from "@/app/lib/prisma";
import { put } from "@vercel/blob";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  try {
    const { id: idParam } = await params;
    const id = Number(idParam);

    if (!id || Number.isNaN(id)) {
      return Response.json({ error: "Invalid profile id" }, { status: 400 });
    }

    const profile = await prisma.profiles.findUnique({
      where: { id },
    });

    if (!profile) {
      return Response.json({ error: "Profile not found" }, { status: 404 });
    }

    return Response.json({ data: profile }, { status: 200 });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return Response.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id: idParam } = await params;
    const id = Number(idParam);

    if (!id || Number.isNaN(id)) {
      return Response.json({ error: "Invalid profile id" }, { status: 400 });
    }

    const formData = await request.formData();
    const name = formData.get("name");
    const title = formData.get("title");
    const email = formData.get("email");
    const bio = formData.get("bio");
    const imgFile = formData.get("img");

    if (!name || name.trim() === "") {
      return Response.json({ error: "Name is required" }, { status: 400 });
    }

    if (!title || title.trim() === "") {
      return Response.json({ error: "Title is required" }, { status: 400 });
    }

    if (!email || email.trim() === "") {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    if (!bio || bio.trim() === "") {
      return Response.json({ error: "Bio is required" }, { status: 400 });
    }

    const existingProfile = await prisma.profiles.findUnique({
      where: { id },
    });

    if (!existingProfile) {
      return Response.json({ error: "Profile not found" }, { status: 404 });
    }

    let imageUrl = existingProfile.image_url;

    if (imgFile && imgFile.size > 0) {
      if (imgFile.size > 1024 * 1024) {
        return Response.json(
          { error: "Image must be less than 1MB" },
          { status: 400 }
        );
      }

      const blob = await put(imgFile.name, imgFile, {
        access: "public",
        allowOverwrite: true,
      });

      imageUrl = blob.url;
    }

    const updated = await prisma.profiles.update({
      where: { id },
      data: {
        name: name.trim(),
        title: title.trim(),
        email: email.trim(),
        bio: bio.trim(),
        image_url: imageUrl,
      },
    });

    return Response.json({ data: updated }, { status: 200 });
  } catch (error) {
    console.error("Error updating profile:", error);

    if (error.code === "P2002") {
      return Response.json({ error: "Email already exists" }, { status: 400 });
    }

    return Response.json({ error: "Failed to update profile" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id: idParam } = await params;
    const id = Number(idParam);

    if (!id || Number.isNaN(id)) {
      return Response.json({ error: "Invalid profile id" }, { status: 400 });
    }

    const existingProfile = await prisma.profiles.findUnique({
      where: { id },
    });

    if (!existingProfile) {
      return Response.json({ error: "Profile not found" }, { status: 404 });
    }

    await prisma.profiles.delete({
      where: { id },
    });

    return Response.json(
      { message: "Profile deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting profile:", error);
    return Response.json({ error: "Failed to delete profile" }, { status: 500 });
  }
}