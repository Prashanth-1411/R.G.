import prisma from '../lib/prisma.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function uploadMedia(req, res) {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    let fileUrl;
    let fileType = req.file.mimetype;
    const fileName = req.file.originalname;

    if (cloudinary.config().cloud_name && cloudinary.config().cloud_name !== 'your_cloud_name') {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'rg-ambulance',
        resource_type: 'auto',
      });
      fileUrl = result.secure_url;
      fs.unlinkSync(req.file.path);
    } else {
      fileUrl = `uploads/${fileName}`;
    }

    const media = await prisma.media.create({
      data: {
        fileName,
        fileUrl,
        fileType,
        fileSize: req.file.size,
        uploadedBy: req.user?.id || null,
      },
    });

    res.status(201).json(media);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
}

export async function getMedia(req, res) {
  try {
    const media = await prisma.media.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(media);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch media' });
  }
}

export async function deleteMedia(req, res) {
  try {
    const { id } = req.params;
    const media = await prisma.media.findUnique({ where: { id: parseInt(id) } });
    if (!media) return res.status(404).json({ error: 'Media not found' });

    if (media.fileUrl && !media.fileUrl.startsWith('uploads/')) {
      const publicId = media.fileUrl.split('/').pop().split('.')[0];
      try { await cloudinary.uploader.destroy(`rg-ambulance/${publicId}`); } catch {}
    }

    await prisma.media.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Media deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete media' });
  }
}
