import prisma from '../lib/prisma.js';

export async function getSections(req, res) {
  try {
    const { pageId } = req.query;
    const where = pageId ? { pageId: parseInt(pageId) } : {};
    const sections = await prisma.section.findMany({
      where,
      orderBy: { position: 'asc' },
    });
    res.json(sections);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sections' });
  }
}

export async function getSection(req, res) {
  try {
    const section = await prisma.section.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!section) return res.status(404).json({ error: 'Section not found' });
    res.json(section);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch section' });
  }
}

export async function createSection(req, res) {
  try {
    const { pageId, type, title, subtitle, content, image, position, isVisible } = req.body;
    const section = await prisma.section.create({
      data: {
        pageId: parseInt(pageId),
        type,
        title,
        subtitle,
        content: content ? (typeof content === 'string' ? JSON.parse(content) : content) : undefined,
        image,
        position: position !== undefined ? parseInt(position) : 0,
        isVisible: isVisible !== undefined ? isVisible : true,
      },
    });
    res.status(201).json(section);
  } catch (error) {
    console.error('Create section error:', error);
    res.status(500).json({ error: 'Failed to create section' });
  }
}

export async function updateSection(req, res) {
  try {
    const { type, title, subtitle, content, image, position, isVisible } = req.body;
    const data = {};
    if (type !== undefined) data.type = type;
    if (title !== undefined) data.title = title;
    if (subtitle !== undefined) data.subtitle = subtitle;
    if (content !== undefined) data.content = typeof content === 'string' ? JSON.parse(content) : content;
    if (image !== undefined) data.image = image;
    if (position !== undefined) data.position = parseInt(position);
    if (isVisible !== undefined) data.isVisible = isVisible;

    const section = await prisma.section.update({
      where: { id: parseInt(req.params.id) },
      data,
    });
    res.json(section);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update section' });
  }
}

export async function deleteSection(req, res) {
  try {
    await prisma.section.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Section deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete section' });
  }
}

export async function reorderSections(req, res) {
  try {
    const { sections } = req.body;
    for (const item of sections) {
      await prisma.section.update({
        where: { id: parseInt(item.id) },
        data: { position: parseInt(item.position) },
      });
    }
    res.json({ message: 'Sections reordered' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reorder sections' });
  }
}
