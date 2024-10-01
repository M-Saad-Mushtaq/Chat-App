import User from "../models/user.model.js";
import Friend from "../models/friend.model.js";
import PendingRequest from "../models/pendingRequest.model.js";
import { getReceiverId, io } from "../socket/socket.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const { search } = req.body;

    const pendingRequests = await PendingRequest.find({
      senderId: loggedInUserId,
    });

    const friends = await Friend.findOne({ acceptorUserId: loggedInUserId });

    const friendIds = friends ? friends.friendsId : [];

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
      username: { $regex: search, $options: "i" }, // i makes it case-insensitive
    }).select("-password");

    // Filter out users that are already in the friends list
    let usersToAdd = filteredUsers.filter(
      (user) => !friendIds.includes(user._id.toString())
    );

    const acceptorIds = pendingRequests.map((request) =>
      request.acceptorId.toString()
    );

    // Filter usersToAdd to remove those present in acceptorIds
    usersToAdd = usersToAdd.filter(
      (user) => !acceptorIds.includes(user._id.toString())
    );

    res.status(200).json(usersToAdd);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getFriendsForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const friends = await Friend.findOne({ acceptorUserId: loggedInUserId });

    if (!friends || friends.friendsId.length === 0) {
      return res.status(200).json([]);
    }

    const friendsDetails = await Promise.all(
      friends.friendsId.map((friendId) => {
        return User.findOne({ _id: friendId }).select("-password");
      })
    );

    res.status(200).json(friendsDetails);
  } catch (error) {
    console.error("Error in getFriendsForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendFriendRequest = async (req, res) => {
  try {
    const { id: acceptorId } = req.params;
    const senderId = req.user._id;

    const user = await User.findOne({ _id: acceptorId });

    if (!user) {
      return res.status(404).json({ error: "Username do not exist!!" });
    }

    const alreadyRequestVar = await PendingRequest.findOne({
      acceptorId: user._id,
      senderId: senderId,
    });
    if (alreadyRequestVar) {
      return res.status(400).json({ error: "Already request sent!" });
    }

    const friendVar = await Friend.findOne({ acceptorUserId: user._id });
    if (friendVar) {
      const areFriends = await friendVar.friendsId.includes(senderId);
      if (areFriends) {
        return res.status(400).json({ error: "Already friends!" });
      }
    }

    const newPendingRequest = new PendingRequest({
      acceptorId: user._id,
      senderId,
    });

    if (newPendingRequest) {
      await newPendingRequest.save();
    } else {
      throw new Error("Request cannot be sent");
    }

    const populatedRequest = await newPendingRequest.populate({
      path: "senderId",
      select: "fullname username profilePic",
    });

    const acceptorSocketId = getReceiverId(acceptorId);
    if (acceptorSocketId) {
      io.to(acceptorSocketId).emit("newRequest", populatedRequest.senderId);
    }

    res.status(201).json({
      requestId: newPendingRequest._id,
    });
  } catch (error) {
    console.error("Error in sendFriendRequest: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const cancelFriendRequest = async (req, res) => {
  try {
    const acceptorId = req.user._id;
    const { id: senderId } = req.params;
    const pendingRequest = await PendingRequest.findOne({
      $or: [
        { acceptorId, senderId },
        { acceptorId: senderId, senderId: acceptorId },
      ],
    });

    if (!pendingRequest) {
      return res.status(410).json({ error: "Request do not exist!!" });
    }

    const delPendingRequest = await PendingRequest.deleteOne({
      _id: pendingRequest._id,
    });

    if (!delPendingRequest) {
      return res
        .status(500)
        .json({ error: "Internal Server Error....Request deletion failed!!" });
    }

    return res.status(200).json({ msg: "Request cancelled Successfully!" });
  } catch (error) {
    console.error("Error in cancelFriendRequest: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
    const { id: senderId } = req.params;
    const acceptorId = req.user._id;

    const pendingRequest = await PendingRequest.findOne({
      senderId: senderId,
      acceptorId: acceptorId,
    });

    if (!pendingRequest) {
      return res.status(410).json({ error: "Request does not exist!" });
    }

    // Function to send the socket event to the friend
    async function sendSocketEvent(userId, newFriendId) {
      const newFriend = await User.findById(newFriendId).select("-password");

      const socketId = getReceiverId(userId);

      if (socketId) {
        io.to(socketId).emit("requestAccepted", newFriend);
      }
    }

    const addFriend = async (acceptorId, senderId) => {
      const existingFriend = await Friend.findOne({
        acceptorUserId: acceptorId,
        friendsId: senderId,
      });

      if (existingFriend) {
        return;
      }

      const acceptorFriendVar = await Friend.findOne({
        acceptorUserId: acceptorId,
      });

      if (!acceptorFriendVar) {
        // If the acceptor does not have a friend list, create a new one
        const newFriendList = new Friend({
          acceptorUserId: acceptorId,
          friendsId: [senderId],
        });
        await newFriendList.save();
      } else {
        // If friend list exists, add the sender to the friends array
        acceptorFriendVar.friendsId.push(senderId);
        await acceptorFriendVar.save();
      }

      // Send socket event for the new friend
      sendSocketEvent(acceptorId, senderId);
    };

    await addFriend(acceptorId, senderId);
    await addFriend(senderId, acceptorId);

    await PendingRequest.deleteOne({ senderId, acceptorId });

    res.status(201).json({ msg: "Request Accepted!" });
  } catch (error) {
    console.error("Error in acceptFriendRequest: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getFriendRequests = async (req, res) => {
  try {
    const acceptorId = req.user._id;

    const pendingRequests = await PendingRequest.find({ acceptorId }).populate({
      path: "senderId",
      select: "fullname username profilePic",
    });

    const users = pendingRequests.map((request) => request.senderId);

    res.status(200).json(users);
  } catch (error) {
    console.error("Error in acceptFriendRequest: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const removeFriend = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const { id: otherUserId } = req.params;

    const loggedInUserFriends = await Friend.findOne({
      acceptorUserId: loggedInUserId,
    });

    const otherUserFriends = await Friend.findOne({
      acceptorUserId: otherUserId,
    });

    if (loggedInUserFriends) {
      // Remove otherUserId from loggedInUser's friendsId array
      loggedInUserFriends.friendsId = loggedInUserFriends.friendsId.filter(
        (friendId) => !friendId.equals(otherUserId)
      );
      await loggedInUserFriends.save();
    }

    if (otherUserFriends) {
      // Remove loggedInUserId from otherUser's friendsId array
      otherUserFriends.friendsId = otherUserFriends.friendsId.filter(
        (friendId) => !friendId.equals(loggedInUserId)
      );
      await otherUserFriends.save();
    }

    const loggedInUserSocketId = getReceiverId(loggedInUserId);
    if (loggedInUserSocketId) {
      io.to(loggedInUserSocketId).emit("removeFriend", otherUserId);
    }

    const otherUserSocketId = getReceiverId(otherUserId);
    if (otherUserSocketId) {
      io.to(otherUserSocketId).emit("removeFriend", loggedInUserId);
    }

    res.status(200).json({ message: "Friend removed successfully." });
  } catch (error) {
    console.error("Error in removeFriend: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
