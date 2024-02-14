const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// 投稿新規作成API
router.post("/post", async (req, res) => {
  const { content } = req.body;

  if (!content) return res.status(400).json("投稿内容がありません。");

  try {
    const newPost = await prisma.post.create({
      data: {
        content,
        authorId: 1,
      },
    });

    return res.status(201).json(newPost);
  } catch (err) {
    console.log(err);
    return res.status(500).json("サーバーエラーです。");
  }

  return res.json({ user });
});

// 最新投稿取得用API
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   const user = await prisma.user.findUnique({ where: { email } });

//   if (!user) {
//     return res.status(401).json({ error: "そのユーザは存在しません" });
//   }

//   const isPasswordValid = await bcrypt.compare(password, user.password);
//   if (!isPasswordValid) {
//     return res.status(401).json({ error: "そのパスワードは間違っています" });
//   }

//   const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
//     expiresIn: "1d",
//   });

//   return res.json({ token });
// });

module.exports = router;
