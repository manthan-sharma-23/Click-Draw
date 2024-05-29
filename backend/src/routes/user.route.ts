import { Router } from "express";

const router = Router();

// wallet
router.post("/signin", (_, res) => {
  const hardCoded_wallet_address: string =
    "EdVZAVvhhEhjj5jKPNxeZi3pWfb5CeZ2dZyVNUi5fJWc";

  return res.json({ address: hardCoded_wallet_address });
});

export default router;
