import prisma from '../lib/prisma.js';

export async function getSettings(req, res) {
  try {
    let settings = await prisma.siteSetting.findUnique({ where: { id: 1 } });
    if (!settings) {
      settings = await prisma.siteSetting.create({ data: { id: 1 } });
    }
    res.json(settings);
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
}

export async function updateSettings(req, res) {
  try {
    const { logo, logoWidth, siteName, favicon, phone, phone2, email, address, footerText, socialLinks } = req.body;

    const data = {};
    if (logo !== undefined) data.logo = logo;
    if (logoWidth !== undefined) data.logoWidth = parseInt(logoWidth);
    if (siteName !== undefined) data.siteName = siteName;
    if (favicon !== undefined) data.favicon = favicon;
    if (phone !== undefined) data.phone = phone;
    if (phone2 !== undefined) data.phone2 = phone2;
    if (email !== undefined) data.email = email;
    if (address !== undefined) data.address = address;
    if (footerText !== undefined) data.footerText = footerText;
    if (socialLinks !== undefined) data.socialLinks = typeof socialLinks === 'string' ? JSON.parse(socialLinks) : socialLinks;

    const settings = await prisma.siteSetting.upsert({
      where: { id: 1 },
      create: { id: 1, ...data },
      update: data,
    });

    res.json(settings);
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({ error: 'Failed to update settings' });
  }
}
