import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  getUsersForSidebar,
  getFriendsForSidebar,
  sendFriendRequest,
  acceptFriendRequest,
  cancelFriendRequest,
  getFriendRequests,
  removeFriend,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", protectRoute, getUsersForSidebar);
router.get("/friends/", protectRoute, getFriendsForSidebar);
router.get("/requests/", protectRoute, getFriendRequests);
router.post("/send-friend-request/:id", protectRoute, sendFriendRequest);
router.post("/accept-friend-request/:id", protectRoute, acceptFriendRequest);
router.post("/cancel-friend-request/:id", protectRoute, cancelFriendRequest);
router.post("/remove-friend/:id", protectRoute, removeFriend);

export default router;
