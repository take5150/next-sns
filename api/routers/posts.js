const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const isAuthenticated = require("../middlewares/isAuthenticated");

const prisma = new PrismaClient();

// 投稿新規作成API
router.post("/post", isAuthenticated, async (req, res) => {
  const { content } = req.body;

  if (!content) return res.status(400).json("投稿内容がありません。");

  try {
    const newPost = await prisma.post.create({
      data: {
        content,
        authorId: req.userId,
      },
      include: {
        author: true,
      },
    });

    return res.status(201).json(newPost);
  } catch (err) {
    console.log(err);
    return res.status(500).json("サーバーエラーです。");
  }
});

// 最新投稿取得用API
router.get("/get_latest_post", async (req, res) => {
  try {
    const latestPosts = await prisma.post.findMany({
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
      },
    });
    return res.json(latestPosts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "サーバーエラーです。" });
  }
});

module.exports = router;
