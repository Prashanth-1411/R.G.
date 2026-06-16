import prisma from '../lib/prisma.js';

export async function getActivityLogs(req, res) {
  try {
    const { limit = 50, offset = 0 } = req.query;
    const logs = await prisma.activityLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit),
      skip: parseInt(offset),
    });
    const total = await prisma.activityLog.count();
    res.json({ logs, total });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity logs' });
  }
}

export async function logActivity(userId, userName, action, entity, entityId, details = {}) {
  try {
    await prisma.activityLog.create({
      data: { userId, userName, action, entity, entityId, details },
    });
  } catch (error) {
    console.error('Log activity error:', error);
  }
}
